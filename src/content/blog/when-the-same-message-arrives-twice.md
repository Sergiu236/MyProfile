---
title: "When the same message arrives twice"
summary: "Every queue worth using promises at-least-once delivery, which is a polite way of saying your handler will run twice. Here is the set of patterns — idempotency keys, the outbox, dead-letter queues and sagas — that make that a non-event."
date: "2026-08-14"
section: "system-architecture"
tags:
  - AWS
  - SQS
  - Event-Driven
  - Distributed Systems
  - .NET
featured: false
---

The first time I moved a piece of work out of a synchronous API call and onto a queue, it felt like a straight upgrade. The API answered instantly, the slow work happened in the background, and the two services stopped being able to take each other down.

Then a customer got charged twice.

Nothing had crashed. No bug in the payment code. The queue had simply done exactly what it promises to do — and I hadn't read that promise carefully enough.

## At-least-once means what it says

Amazon SQS, like most queues, guarantees **at-least-once delivery**. Not exactly-once. At least once.

The mechanism behind that is the **visibility timeout**. A message isn't deleted when you receive it — it's hidden:

```text
Consumer receives message  →  message hidden for 30s (visibility timeout)
        │
        ├── handler finishes, deletes message  →  gone. done.
        │
        └── handler crashes / is slow / pod restarts / timeout expires
                     ↓
              message becomes visible again
                     ↓
              redelivered to a consumer  →  your handler runs a SECOND time
```

So the message comes back if your handler takes longer than the timeout, if the process dies mid-work, if a deploy rolls the pod, or if the network eats your delete call. Every one of those is normal operations, not a disaster.

Which means the useful question isn't "how do I stop duplicates?" You can't. It's **"what happens when my handler runs twice?"** If the honest answer is "the customer gets charged twice", the design isn't finished.

## Idempotency is the actual fix

An idempotent handler produces the same end state whether it runs once or five times. The usual way there is a key you can deduplicate on — and crucially, **the producer supplies it**, because the producer knows what the business event is:

```csharp
public async Task HandleAsync(PaymentRequested msg, CancellationToken ct)
{
    // The unique key for this business event, not for this delivery
    var exists = await _db.ProcessedEvents
        .AnyAsync(e => e.Id == msg.EventId, ct);

    if (exists)
    {
        _logger.LogInformation("Event {Id} already processed, skipping", msg.EventId);
        return; // then delete the message — this is success, not failure
    }

    await _payments.ChargeAsync(msg.OrderId, msg.Amount, ct);
    _db.ProcessedEvents.Add(new ProcessedEvent(msg.EventId));

    await _db.SaveChangesAsync(ct);
}
```

Two details that matter more than they look:

**Put a unique constraint on that key.** The check-then-act above still has a race — two consumers can both read "not processed" before either writes. The database constraint is what actually enforces it; catch the duplicate-key violation and treat it as "already done."

**Write the marker in the same transaction as the work.** If the charge commits and the marker doesn't, you've built an elaborate way of charging twice anyway.

## FIFO queues are not the answer to this

There's a tempting shortcut here: SQS FIFO queues offer deduplication and ordering, so why not just use those?

Because they buy less than they appear to. Deduplication only covers a 5-minute window — a redelivery an hour later sails straight through. Ordering is per *message group*, so you only get real ordering if you shard your groups sensibly, and the more strictly you order, the less you can parallelise. FIFO throughput is also capped well below standard queues.

FIFO is right when ordering is genuinely part of the business rule ("apply these ledger entries in sequence"). It is not a substitute for an idempotent handler.

## The gap between your database and your queue

Here's a subtler failure. You save an order, then publish an event:

```csharp
await _db.SaveChangesAsync(ct);        // committed
await _sqs.SendMessageAsync(msg, ct);  // ...and this throws
```

Now the order exists and nothing downstream will ever hear about it. Swap the order of those two lines and you get the mirror image: an event announcing an order that was never saved. There's no arrangement of two separate systems that makes this atomic.

The **outbox pattern** sidesteps it by only ever writing to one system:

```text
                    ┌─────────── ONE transaction ───────────┐
  Save order   →    │  orders table  +  outbox_messages row  │
                    └───────────────────────────────────────┘
                                     ↓
                       background publisher polls outbox
                                     ↓
                            publish to SQS  →  mark row as sent
                                     ↓
                     crashed before marking? republish next poll
                        (which is fine — consumers are idempotent)
```

The event becomes part of the same commit as the data. The publisher can crash whenever it likes; the worst case is a duplicate, and you've already handled those.

## When step 4 of 6 fails

Once work spans services, you lose database transactions across the whole flow. An order that touches payment, inventory and shipping can't roll all three back with one command.

A **saga** handles this by making each step publish what it did, and giving each step a **compensating action** — an explicit business undo:

```text
OrderPlaced → PaymentTaken → StockReserved → ✗ ShippingFailed
                                                    ↓
                                         StockReleased  (compensate)
                                                    ↓
                                         PaymentRefunded  (compensate)
                                                    ↓
                                         OrderCancelled
```

Note that "refund the payment" is not a rollback. It's a new business fact, with its own record. That's usually closer to what the business actually wants anyway — finance would rather see a charge and a refund than have a charge silently vanish.

This is also why explicit intermediate states are worth the effort. `Pending → Confirmed` tells you where a stuck order is. A boolean `IsComplete` tells you nothing at 3am.

## Dead-letter queues, and actually reading them

Some messages will never succeed. Malformed payload, a referenced record that got deleted, a bug. Without somewhere to put those, one bad message retries forever and blocks everything behind it.

A **dead-letter queue** is where a message goes after N failed attempts. Two rules I'd insist on:

1. **Alarm on `ApproximateNumberOfMessagesVisible > 0` on the DLQ.** A DLQ nobody watches is just a folder where you lose data quietly.
2. **Make the redrive path boring.** Fix the bug, deploy, push the messages back. That's only safe because the handlers are idempotent — which is the thread running through all of this.

## Share the contract, not the assumption

Last one, and it's cheap to get right. When two services agree on a message shape, that shape should live in exactly one place — an internal NuGet package holding the message classes and nothing else. No handlers, no infrastructure, no database access. Just the contract.

The alternative is a hand-copied class in each repo, and a silent production incident three months later when someone renames a field on one side only.

## The shape of it

Nothing here is exotic. It's five habits that turn "the queue delivered it twice" from an incident into a log line:

- Assume every handler runs more than once, and give it an idempotency key with a unique constraint behind it
- Write your data and your outgoing event in one transaction, via an outbox
- Model multi-service flows as sagas with real compensating actions, not imagined rollbacks
- Give failures a dead-letter queue, and alarm on it
- Keep the message contract in one shared package

Queues don't make a system reliable on their own. They move the hard part somewhere you can actually deal with it.
