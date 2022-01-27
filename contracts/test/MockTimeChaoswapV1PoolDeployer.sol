// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import '../interfaces/IChaoswapV1PoolDeployer.sol';

import './MockTimeChaoswapV1Pool.sol';

contract MockTimeChaoswapV1PoolDeployer is IChaoswapV1PoolDeployer {
    struct Parameters {
        address factory;
        address token0;
        address token1;
        uint24 fee;
        int24 tickSpacing;
    }

    Parameters public override parameters;

    event PoolDeployed(address pool);

    function deploy(
        address factory,
        address token0,
        address token1,
        uint24 fee,
        int24 tickSpacing
    ) external returns (address pool) {
        parameters = Parameters({factory: factory, token0: token0, token1: token1, fee: fee, tickSpacing: tickSpacing});
        pool = address(
            new MockTimeChaoswapV1Pool{salt: keccak256(abi.encodePacked(token0, token1, fee, tickSpacing))}()
        );
        emit PoolDeployed(pool);
        delete parameters;
    }
}
