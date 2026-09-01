---
title: "Physics-Informed ML Engine Simulation"
summary: "A Hamiltonian Neural Network that learns multi-body piston-crank dynamics while conserving energy by construction, used as a fast surrogate for finite-element simulation."
date: "2026-01-15"
period: "2026 — Present"
status: "In research"
role: "Model design and numerical integration"
tags:
  - Python
  - PyTorch
  - NumPy
  - SciPy
  - Scientific Computing
metrics:
  - value: "0"
    label: "Numerical energy drift"
  - value: "FEM"
    label: "Accuracy target"
---

Classical neural surrogates learn to imitate a simulation and then quietly violate its physics — energy leaks, trajectories drift, and long rollouts become fiction. This project takes the opposite approach: build the conservation law into the model's structure so it cannot be broken.

## Learning the Hamiltonian, not the trajectory

A **Hamiltonian Neural Network** learns the dynamics of a multi-body piston-crank subsystem by modelling its energy function rather than its state transitions. Motion is then recovered from the gradients of that learned energy.

## Symplectic gradients, computed automatically

Energy conservation is enforced in the model's latent phase space through **symplectic gradients obtained by automatic differentiation**. Because the update respects the geometry of Hamiltonian flow, integration error stops accumulating as drift — the simulation stays physical over long horizons.

## A surrogate that plugs into real solvers

The trained network is integrated with **SciPy ODE solvers**, so it can stand in for a finite-element model inside an existing numerical pipeline — matching FEM accuracy at a fraction of the runtime.
