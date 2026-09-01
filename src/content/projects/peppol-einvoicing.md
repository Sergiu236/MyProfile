---
title: "Peppol E-Invoicing Engine"
summary: "A .NET 10 e-invoicing subsystem built on Clean Architecture and DDD, with Windows Service automation that removed roughly 42 hours of manual work every month."
date: "2025-10-01"
period: "2025"
status: "In production"
role: "Design and implementation · built at TSS Yonder"
tags:
  - ".NET 10"
  - "Clean Architecture"
  - "DDD"
  - "C#"
  - "Compliance"
metrics:
  - value: "~42h"
    label: "Manual work removed monthly"
  - value: "Peppol"
    label: "Compliance standard"
---

European e-invoicing is a compliance problem wearing an integration problem's clothes. Documents must be valid against the Peppol BIS specification, delivered through an access point, and reconciled back into a dealer management system that predates all of it.

## A domain model that survives regulation

The engine is built on **Clean Architecture with a DDD core** in **.NET 10**. Invoice validity, tax rules and document lifecycle live in the domain layer with no infrastructure dependencies, so a change in regulation is a change in one place rather than a migration across the codebase.

## Automation that nobody has to remember to run

A **Windows Service** drives generation, validation, transmission and retry on a schedule. What used to be a recurring manual routine — assembling documents, checking them, sending them, chasing failures — now runs unattended, freeing **roughly 42 hours per month** across the team.

> Built as part of my work at TSS Yonder on the cloud-native dealer management platform.
