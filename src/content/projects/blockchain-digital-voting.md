---
title: "Blockchain Digital Voting System"
summary: "A nine-contract Ethereum voting system behind upgradeable proxies, with O(1) vote deduplication and Merkle-proof eligibility verification."
date: "2025-06-01"
period: "2025"
status: "Shipped"
role: "Architecture, smart contracts, dApp"
featured: true
tags:
  - Solidity
  - Ethereum
  - TypeScript
  - React
  - Cryptography
metrics:
  - value: "9"
    label: "Upgradeable contracts"
  - value: "96%"
    label: "Less on-chain storage"
  - value: "O(1)"
    label: "Vote deduplication"
  - value: "O(log n)"
    label: "Eligibility proofs"
---

An end-to-end digital voting system where correctness has to be provable rather than promised — every eligibility check, every deduplication rule and every upgrade path is enforced on-chain.

## Upgradeable without state migration

The system is composed of **nine contracts sitting behind EIP-1967 upgradeable proxies**, so logic can be replaced in place as the rules of an election evolve — without migrating a single byte of state or invalidating votes already cast.

## Deduplication that does not grow with the electorate

Naively, preventing double votes means a mapping entry per voter. Instead, eligibility and voting status are packed into **bitwise arrays**, giving **O(1) deduplication** and cutting on-chain storage by **96%** against the mapping-based baseline. At election scale, that is the difference between a viable deployment and an unaffordable one.

## Proving eligibility off-chain, verifying it on-chain

Voter rolls never touch the chain. A **Merkle proof pipeline** generates proofs off-chain in **O(log n)**, and the contract verifies membership against a single committed root. The React dApp issues proof-carrying transactions and drives an **RBAC-aware interface** that shows each participant only the actions their role actually permits.
