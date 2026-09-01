---
title: "Cutting On-Chain Storage by 96% with Bitwise Arrays"
summary: "Placeholder post. Why a mapping per voter is the wrong data structure, and what replaces it when every slot costs real money."
date: "2026-05-21"
section: "blockchain"
tags:
  - Solidity
  - Gas Optimisation
  - Data Structures
  - Ethereum
---

> Placeholder copy for layout review.

Lorem ipsum dolor sit amet. On Ethereum, a data structure has a price list. Choosing the wrong one is not inelegant — it is expensive, permanently, for everyone who ever calls the contract.

## The naive version

Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.

```solidity
mapping(address => bool) private hasVoted; // one storage slot per voter
```

## The version that ships

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

```solidity
mapping(uint256 => uint256) private voteBitmap; // 256 voters per slot

function _markVoted(uint256 index) internal {
    voteBitmap[index >> 8] |= (1 << (index & 0xff));
}
```

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
