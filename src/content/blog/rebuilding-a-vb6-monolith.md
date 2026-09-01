---
title: "Rebuilding a VB6 Monolith Without Stopping the Business"
summary: "Placeholder post. How you move 750 companies off a twenty-year-old desktop application while it is still processing their invoices."
date: "2026-08-18"
section: "engineering"
featured: true
tags:
  - Migration
  - ".NET"
  - Architecture
  - Legacy
---

> This is placeholder copy so the layout can be reviewed. Replace the body — the frontmatter is the real contract.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. The interesting part of a migration is never the new system. It is the eighteen months where both systems are true at once, and every write has to land in the right place.

## The part nobody writes about

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

- Duis aute irure dolor in reprehenderit in voluptate.
- Excepteur sint occaecat cupidatat non proident.
- Sunt in culpa qui officia deserunt mollit anim id est laborum.

### Strangling the monolith, one route at a time

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit.

```csharp
public sealed class InvoiceRouter(ILegacyBridge legacy, IInvoiceStore store)
{
    public async Task<RouteResult> RouteAsync(Invoice invoice, CancellationToken ct)
    {
        if (invoice.IsMigrated)
            return await store.PersistAsync(invoice, ct);

        // Dual-write until the legacy reader is retired
        await legacy.MirrorAsync(invoice, ct);
        return await store.PersistAsync(invoice, ct);
    }
}
```

Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.

## What I would do differently

Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
