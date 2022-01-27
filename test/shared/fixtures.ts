import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeChaoswapV1Pool } from '../../typechain/MockTimeChaoswapV1Pool'
import { TestERC20 } from '../../typechain/TestERC20'
import { ChaoswapV1Factory } from '../../typechain/ChaoswapV1Factory'
import { TestChaoswapV1Callee } from '../../typechain/TestChaoswapV1Callee'
import { TestChaoswapV1Router } from '../../typechain/TestChaoswapV1Router'
import { MockTimeChaoswapV1PoolDeployer } from '../../typechain/MockTimeChaoswapV1PoolDeployer'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: ChaoswapV1Factory
}

async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('ChaoswapV1Factory')
  const factory = (await factoryFactory.deploy()) as ChaoswapV1Factory
  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestChaoswapV1Callee
  swapTargetRouter: TestChaoswapV1Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeChaoswapV1Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeChaoswapV1PoolDeployerFactory = await ethers.getContractFactory('MockTimeChaoswapV1PoolDeployer')
  const MockTimeChaoswapV1PoolFactory = await ethers.getContractFactory('MockTimeChaoswapV1Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestChaoswapV1Callee')
  const routerContractFactory = await ethers.getContractFactory('TestChaoswapV1Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestChaoswapV1Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestChaoswapV1Router

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer = (await MockTimeChaoswapV1PoolDeployerFactory.deploy()) as MockTimeChaoswapV1PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string
      return MockTimeChaoswapV1PoolFactory.attach(poolAddress) as MockTimeChaoswapV1Pool
    },
  }
}
