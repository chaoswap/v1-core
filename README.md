# Chaoswap V1

[![Lint](https://github.com/Chaoswap/Chaoswap-v1-core/actions/workflows/lint.yml/badge.svg)](https://github.com/Chaoswap/Chaoswap-v1-core/actions/workflows/lint.yml)
[![Tests](https://github.com/Chaoswap/Chaoswap-v1-core/actions/workflows/tests.yml/badge.svg)](https://github.com/Chaoswap/Chaoswap-v1-core/actions/workflows/tests.yml)
[![Fuzz Testing](https://github.com/Chaoswap/Chaoswap-v1-core/actions/workflows/fuzz-testing.yml/badge.svg)](https://github.com/Chaoswap/Chaoswap-v1-core/actions/workflows/fuzz-testing.yml)
[![Mythx](https://github.com/Chaoswap/Chaoswap-v1-core/actions/workflows/mythx.yml/badge.svg)](https://github.com/Chaoswap/Chaoswap-v1-core/actions/workflows/mythx.yml)
[![npm version](https://img.shields.io/npm/v/@uniswap/v3-core/latest.svg)](https://www.npmjs.com/package/@uniswap/v3-core/v/latest)

This repository contains the core smart contracts for the Chaoswap V1 Protocol.
For higher level contracts, see the [Chaoswap-v1-periphery](https://github.com/Chaoswap/Chaoswap-v1-periphery)
repository.

## Bug bounty

This repository is subject to the Chaoswap V1 bug bounty program, per the terms defined [here](./bug-bounty.md).

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@uniswap/v3-core`
and import the factory bytecode located at
`@uniswap/v3-core/artifacts/contracts/ChaoswapV1Factory.sol/ChaoswapV1Factory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@uniswap/v3-core/artifacts/contracts/ChaoswapV1Factory.sol/ChaoswapV1Factory.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all Chaoswapcode will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Chaoswap V1 interfaces are available for import into solidity smart contracts
via the npm artifact `@uniswap/v3-core`, e.g.:

```solidity
import '@uniswap/v3-core/contracts/interfaces/IChaoswapV1Pool.sol';

contract MyContract {
  IChaoswapV1Pool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```

## Licensing

The primary license for Chaoswap V1 Core is the Business Source License 1.1 (`BUSL-1.1`), see [`LICENSE`](./LICENSE).

### Exceptions

- All files in `contracts/interfaces/` are licensed under `GPL-2.0-or-later` (as indicated in their SPDX headers), see [`contracts/interfaces/LICENSE`](./contracts/interfaces/LICENSE)
- Several files in `contracts/libraries/` are licensed under `GPL-2.0-or-later` (as indicated in their SPDX headers), see [`contracts/libraries/LICENSE_GPL`](contracts/libraries/LICENSE_GPL)
- `contracts/libraries/FullMath.sol` is licensed under `MIT` (as indicated in its SPDX header), see [`contracts/libraries/LICENSE_MIT`](contracts/libraries/LICENSE_MIT)
- All files in `contracts/test` remain unlicensed.
