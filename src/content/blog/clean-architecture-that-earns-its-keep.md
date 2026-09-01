---
title: "Clean Architecture in .NET 10: What Actually Earns Its Keep"
summary: "Placeholder post. Four layers is a cost. Here is the part of it I would defend in a design review, and the part I would delete."
date: "2026-02-04"
section: "engineering"
tags:
  - ".NET"
  - "Clean Architecture"
  - DDD
  - Design
---

> Placeholder copy for layout review.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Clean Architecture is usually sold as protection from frameworks. In practice, what it protects is your ability to change a business rule without reading the whole codebase.

## The layer that pays for itself

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.

## The layer that usually does not

Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

| Layer | Pays for itself when | Delete it when |
| --- | --- | --- |
| Domain | Rules change often | The rules are CRUD |
| Application | Many entry points | There is exactly one |
| Infrastructure | Providers get swapped | They never do |

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
