---
title: "Teaching a Neural Network to Respect Conservation of Energy"
summary: "Placeholder post. A surrogate model that drifts is a surrogate model that lies. Hamiltonian networks fix it at the level of structure."
date: "2026-04-09"
section: "machine-learning"
tags:
  - PyTorch
  - Physics
  - Simulation
  - Research
---

> Placeholder copy for layout review.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Train a plain MLP on a pendulum and it will look perfect for two hundred steps, then quietly invent energy from nothing.

## Structure beats supervision

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

```python
def hamiltonian_step(model, state):
    q, p = state.chunk(2, dim=-1)
    H = model(torch.cat([q, p], dim=-1)).sum()
    dHdq, dHdp = torch.autograd.grad(H, [q, p], create_graph=True)
    return torch.cat([dHdp, -dHdq], dim=-1)  # symplectic
```

## Where the accuracy actually comes from

Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, duis aute irure dolor.
