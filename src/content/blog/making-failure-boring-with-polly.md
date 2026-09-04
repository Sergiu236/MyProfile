---
title: "Making failure boring with Polly"
summary: "A dependency being down shouldn't reach your users as a stack trace. Five resilience policies — retry, backoff, circuit breaker, timeout and fallback — and, more importantly, when each one makes things worse."
date: "2026-09-01"
section: "cloud-devops"
tags:
  - .NET
  - Resilience
  - AWS
  - Polly
---

Resilience gets described as "the system doesn't go down," which sets an impossible bar. I prefer a lower, more useful one: **things break, and the user doesn't find out.**

The difference between those two looks like this:

```text
Without:
  request → call service → service down → exception → 500 → angry user

With:
  request → call service → service down → retry ×3 → still down
          → serve cached data → user carries on, unaware
```

Same outage. Completely different experience. In .NET, [Polly](https://www.pollydocs.org/) is how you get from the top row to the bottom one, and it's mostly a matter of knowing which of five tools to reach for.

## Retry, but with backoff

The naive retry is three attempts, immediately, one after another:

```csharp
var policy = Policy
    .Handle<HttpRequestException>()
    .RetryAsync(3);
```

If the dependency is briefly overloaded, this is the worst thing you can do — you've just tripled your traffic against a service that's already struggling. And because every instance of your app retries on the same rhythm, they synchronise into a wave.

**Exponential backoff with jitter** fixes both:

```csharp
var retry = Policy
    .Handle<HttpRequestException>()
    .Or<TimeoutRejectedException>()
    .WaitAndRetryAsync(
        retryCount: 3,
        sleepDurationProvider: attempt =>
            TimeSpan.FromSeconds(Math.Pow(2, attempt))          // 2s, 4s, 8s
            + TimeSpan.FromMilliseconds(Random.Shared.Next(0, 500)), // jitter
        onRetry: (outcome, delay, attempt, _) =>
            logger.LogWarning("Retry {Attempt} in {Delay}ms: {Reason}",
                attempt, delay.TotalMilliseconds, outcome.Exception?.Message));
```

Each wait doubles, giving the dependency room to recover, and the random jitter stops every instance from hammering it in unison.

One rule that matters more than the config: **only retry what's actually retryable.** A timeout or a 503 is worth another go. A 400 or a 404 will fail identically forever, and a non-idempotent POST might succeed twice. Retrying those isn't resilience, it's just a slower failure with worse side effects.

## The circuit breaker stops you flogging a dead service

Retries handle a blip. They're wrong for a dependency that's been down for ten minutes — at that point every request pays the full retry delay before failing anyway, and your own thread pool fills up with requests going nowhere.

A **circuit breaker** watches the failure rate and, past a threshold, stops even trying:

```csharp
var breaker = Policy
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(
        handledEventsAllowedBeforeBreaking: 5,
        durationOfBreak: TimeSpan.FromSeconds(30),
        onBreak: (outcome, duration) =>
            logger.LogError("Circuit OPEN for {Seconds}s", duration.TotalSeconds),
        onReset: () => logger.LogInformation("Circuit CLOSED, service recovered"));
```

It has three states, and the third is the clever one:

```text
CLOSED      calls pass through, failures counted
   │        5 failures
   ▼
OPEN        calls fail instantly — no network, no waiting
   │        30 seconds later
   ▼
HALF-OPEN   let ONE call through as a probe
              ├── succeeds → back to CLOSED
              └── fails    → back to OPEN for another 30s
```

Failing instantly sounds unhelpful, but it's the point. It protects the struggling dependency from your traffic and protects you from queuing up work that can't complete.

## Timeout, because "hung" is worse than "failed"

A dependency that returns an error is easy. One that accepts your connection and then goes quiet is what actually takes services down — each hung call holds a thread and a connection until something gives up, and if nothing does, you run out of both.

```csharp
var timeout = Policy.TimeoutAsync(TimeSpan.FromSeconds(5));
```

Always set one, and set it lower than you think. A five-second timeout on a call that normally takes 80ms isn't generous, it's a five-second window where your capacity is quietly draining.

## Fallback is where the user stops noticing

Everything above is about failing well. Fallback is about not showing the failure at all:

```csharp
var fallback = Policy<Rates>
    .Handle<Exception>()
    .FallbackAsync(
        fallbackAction: async ct => await _cache.GetLastKnownRatesAsync(ct),
        onFallbackAsync: async outcome =>
        {
            logger.LogWarning("Serving cached rates: {Reason}", outcome.Exception.Message);
            await Task.CompletedTask;
        });
```

Slightly stale exchange rates with a "last updated 14:02" label beats an error page, in almost every case. The judgement call is per feature: stale product listings, fine. Stale account balance, absolutely not. Fallback is a product decision that happens to be written in C#.

## Bulkhead: one slow dependency, not one dead service

Named after ship compartments — flood one, the rest stay dry. A **bulkhead** caps how much of your capacity a single dependency can consume:

```csharp
var bulkhead = Policy.BulkheadAsync(
    maxParallelization: 10,   // at most 10 concurrent calls
    maxQueuingActions: 20);   // plus 20 waiting, then reject fast
```

Without it, one slow third-party API can absorb every thread you have, and a service that depends on five things goes down because one of them got slow.

## Stacking them in the right order

Individually these are simple. The ordering is what people get wrong — policies wrap outward, so the **outermost runs first**:

```csharp
var resilient = Policy.WrapAsync(fallback, breaker, retry, timeout);
//                                  ▲       ▲       ▲      ▲
//                            last resort   │       │   per-attempt
//                                    stop trying  retry
```

Read it inside out: the timeout applies to *each individual attempt*; the retry re-attempts a timed-out call; the breaker counts those failures and eventually stops the whole thing; the fallback catches whatever comes out the far end. Put the timeout outermost instead and it covers all retries combined, which is almost never what you meant.

In practice, wire it once through `IHttpClientFactory` rather than at call sites:

```csharp
builder.Services
    .AddHttpClient<IRatesClient, RatesClient>(c =>
        c.BaseAddress = new Uri("https://rates.internal/"))
    .AddPolicyHandler(resilient);
```

## The bit that isn't Polly

Policies protect a single call. They don't make a system highly available — that's a different layer, and on AWS it's mostly boring infrastructure work:

- **Load balancer plus autoscaling**, so no single instance is a single point of failure
- **Redis, cache-aside**, so a hot read path doesn't need the database at all
- **SQS between services**, so a consumer being down means a queue getting longer instead of an error reaching a user

Polly is what you reach for when a call fails *now*. The infrastructure is what stops that call from being the only one available. You want both, and neither is a substitute for the other.

The goal isn't a system that never fails. It's a system where failure is a log line and a dashboard blip, not a phone call.
