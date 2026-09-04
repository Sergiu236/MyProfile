---
title: "What await actually does to your code"
summary: "The compiler rewrites your async method into a state machine. Once you can picture that machine, ValueTask, ConfigureAwait and the classic WaitAll deadlock all stop being trivia and start being obvious."
date: "2026-07-18"
section: "backend-engineering"
tags:
  - C#
  - .NET
  - Async
  - Performance
---

Someone once asked me in an interview what happens when you write `await`. I said "it waits for the thing to finish." That's not wrong, but it's maybe 5% of the answer, and the other 95% is where all the interesting bugs live.

Here's the version I wish I'd given.

## await is a rewrite, not a pause

When you write this:

```csharp
public async Task<Invoice> GetInvoiceAsync(int id)
{
    var row = await _db.Invoices.FirstAsync(i => i.Id == id);
    var pdf = await _storage.DownloadAsync(row.PdfKey);
    return new Invoice(row, pdf);
}
```

the C# compiler doesn't keep that method. It throws it away and replaces it with a **state machine** — a struct with an integer field tracking where you are, plus fields for every local variable that has to survive an await.

Roughly:

```text
state = -1  →  start: kick off the DB query
                 ↓  not finished? save state, return to caller
state = 0   →  DB done: we have `row`, start the download
                 ↓  not finished? save state, return to caller
state = 1   →  download done: build the Invoice, complete the Task
```

Your method isn't sitting there blocking. It runs until the first unfinished await, **returns to its caller**, and gets resumed later by whichever thread completes the operation. That's the whole trick: one thread can start thousands of these and none of them are parked waiting.

The important consequence: `await` doesn't create a thread. It gives one up.

## Why the state machine is a struct

The generated state machine is a `struct`, which means it starts life on the stack — free, no allocation, no work for the garbage collector.

But a struct on the stack can't survive the method returning. So the moment your method actually *suspends* (hits an await that hasn't finished yet), the runtime has to **box that struct onto the heap** so it still exists when the continuation fires.

Which gives you two very different cost profiles from the same method:

| Case | What happens |
| --- | --- |
| Everything finishes synchronously (cache hit, buffered stream) | State machine stays on the stack, no boxing |
| Anything genuinely suspends (real DB call, real HTTP) | Struct gets boxed to the heap, plus a `Task` object |

For a method that hits the network, that allocation is noise — you're already waiting milliseconds. For a hot method called a hundred thousand times a second that usually returns a cached value, it's the whole cost.

## That's the entire reason ValueTask exists

`Task` is a class, so returning one always allocates. `ValueTask` is a struct wrapper that can hold **either** an already-computed result **or** a real Task if it needs one:

```csharp
// Allocates a Task every call, even on a cache hit
public async Task<decimal> GetRateAsync(string code)
{
    if (_cache.TryGetValue(code, out var cached)) return cached;
    return await _http.GetRateAsync(code);
}

// Cache hit path allocates nothing at all
public async ValueTask<decimal> GetRateAsync(string code)
{
    if (_cache.TryGetValue(code, out var cached)) return cached;
    return await _http.GetRateAsync(code);
}
```

The catch, and it's a real one: a `ValueTask` may only be awaited **once**, and you must not block on it or stash it in a field. Break those rules and you get corrupted results rather than a clean exception. So the rule I use is simple — `Task` by default, `ValueTask` only for a hot path that usually completes synchronously, and only when I've actually got a reason.

## ConfigureAwait(false), minus the cargo cult

By default, when an await resumes, it tries to come back to the context it started on. In old ASP.NET and in WinForms/WPF, that context is a specific thread — the UI thread, or a request context. `ConfigureAwait(false)` says "I don't care which thread resumes me, just use a pool thread."

Two things worth being clear about:

- **ASP.NET Core has no SynchronizationContext.** So in a normal web API, `ConfigureAwait(false)` changes nothing. Adding it everywhere is habit, not optimisation.
- **Library code should still use it.** You don't know who's calling you. If a desktop app calls your library and you capture their UI context on every await, you've made their app slower for no reason.

## The deadlock you only hit once

This is the one that actually bites people:

```csharp
// Fine: waits without blocking, runs both concurrently
var results = await Task.WhenAll(taskA, taskB);

// Dangerous: blocks the current thread until both finish
Task.WaitAll(taskA, taskB);
```

`WhenAll` gives you a task you await. `WaitAll` **blocks the thread it's on**. Under load, a handful of threads blocked like that will drain the pool — every blocked thread is one that can't serve a request, and the work those threads are waiting for needs a pool thread to finish. Thread starvation, and in a context-capturing app, a hard deadlock. Same story for `.Result` and `.GetAwaiter().GetResult()`.

If a method is async, stay async all the way up. The moment you block in the middle, you've thrown away the only benefit you were getting.

## The short version

```text
await            → compiler builds a state machine, gives up the thread
struct           → free while synchronous, boxed to heap when it suspends
ValueTask        → skips that allocation on the sync path, await it exactly once
ConfigureAwait   → matters in libraries, no-op in ASP.NET Core
WaitAll/.Result  → blocks a thread; under load that's starvation
```

None of this is trivia you memorise for an interview. It's the difference between a service that holds up at a few thousand requests a second and one that quietly runs out of threads at 3am.
