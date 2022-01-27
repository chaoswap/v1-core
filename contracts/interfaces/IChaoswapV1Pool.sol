// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IChaoswapV1PoolImmutables.sol';
import './pool/IChaoswapV1PoolState.sol';
import './pool/IChaoswapV1PoolDerivedState.sol';
import './pool/IChaoswapV1PoolActions.sol';
import './pool/IChaoswapV1PoolOwnerActions.sol';
import './pool/IChaoswapV1PoolEvents.sol';

/// @title The interface for a Chaoswap V1 Pool
/// @notice A Chaoswappool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IChaoswapV1Pool is
    IChaoswapV1PoolImmutables,
    IChaoswapV1PoolState,
    IChaoswapV1PoolDerivedState,
    IChaoswapV1PoolActions,
    IChaoswapV1PoolOwnerActions,
    IChaoswapV1PoolEvents
{

}
