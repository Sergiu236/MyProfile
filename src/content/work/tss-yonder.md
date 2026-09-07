---
company: "TSS Yonder"
role: "Software Engineer"
context: "Migrating a Dealer Management System used by 750+ automotive businesses across Western Europe from a legacy VB6 desktop app to a cloud-native AWS platform."
dateStart: "2025-01-01"
dateEnd: "Present"
location: "Romania"
type: "Full-time"
stack:
  - ".NET (C#)"
  - "Spring Boot (Java)"
  - "React (TypeScript)"
  - "AWS CDK/ ECS/ EventBridge/ SQS"
  - "SQL Server"
  - "Azure DevOps"
metrics:
  - value: "750+"
    label: "Businesses on the platform"
  - value: "23K+"
    label: "Daily transactions"
  - value: "1,000+"
    label: "Concurrent users"
  - value: "86%"
    label: "Faster deployments"
---

**Led the cloud migration** to a **React/TypeScript** frontend and a **polyglot microservices backend**, provisioning AWS infrastructure with **CDK** and deploying to **ECS Fargate**. Scaled the system to reliably handle **23,000+ daily transactions** and **1,000+ concurrent users** with zero downtime.

**Cut deployment time 86%** (90 → <12 min) by building end-to-end Azure DevOps pipelines covering automated testing, SQL migrations, and multi-environment AWS rollouts.

**Architected an event-driven communication layer** across microservices using **Amazon EventBridge** and **SQS**, with idempotent consumer workers guaranteeing once processing and fault tolerance during peak traffic.

**Ended recurring data divergence** by co-engineering a REST sync layer that keeps an **AWS RDS** source of truth consistent with two on-premises SQL Server instances.
