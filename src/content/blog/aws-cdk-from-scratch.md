---
title: "Provisioning an Entire AWS Estate with CDK"
summary: "Placeholder post. VPCs, Fargate services, RDS and ECR — described once, in TypeScript, and reproducible from an empty account."
date: "2026-07-02"
section: "cloud"
tags:
  - AWS
  - CDK
  - Infrastructure as Code
  - Fargate
---

> Placeholder copy for layout review.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Infrastructure you cannot recreate from an empty account is not infrastructure — it is an artefact you are afraid of.

## One language for the whole estate

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.

```typescript
const service = new ApplicationLoadBalancedFargateService(this, "CoreApi", {
  cluster,
  cpu: 1024,
  memoryLimitMiB: 2048,
  desiredCount: 3,
  taskImageOptions: { image: ContainerImage.fromEcrRepository(repo, tag) },
  circuitBreaker: { rollback: true },
})
```

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.

## Zero-downtime is a deployment property, not a wish

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.

1. Health checks that actually reflect readiness.
2. A circuit breaker with rollback enabled.
3. Migrations that are backwards compatible by default.
