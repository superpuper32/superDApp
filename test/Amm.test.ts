import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract, BigNumberish } from 'ethers';
// import { makeBig } from '../frontend/src/lib/number-utils';
// import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const makeBig = (value: string | number) => {
  if (typeof value === 'number') {
    value = value.toString();
  }
  return ethers.parseUnits(value);
};

describe('Amm', () => {
  let amm: Contract;
  let matic: Contract;
  let superflow: Contract;
  let owner: SignerWithAddress, user1: SignerWithAddress

  // Quickly approves the AMM contract and provides it with liquidity for a given user
	const provideLiquidity = async (user: SignerWithAddress, allowAmount = 1_000, provideAmount = 100) => {
    const allow = makeBig(allowAmount); //1_000
    const provide = makeBig(provideAmount); //100
    await superflow.connect(user).approve(amm.target, allow);
    await matic.connect(user).approve(amm.target, allow);
    await amm.connect(user).provide(provide, provide);
  };

  beforeEach(async () => {
    // the getSigners() method allows us a to create mock users
    const [_owner, _user1] = await ethers.getSigners();
    owner = _owner;
    user1 = _user1;
  });

  beforeEach(async () => {
    // Deploy the Matic contract
    matic = await ethers.deployContract('Matic');

    // Deploy the Goflow contract
    superflow = await ethers.deployContract('Superflow');

    // Deploy the AMM contract
    amm = await ethers.deployContract('AMM', [matic.target, superflow.target]);

    // Mint and transfer tokens so that owner and user1 have 1000 of each
    await superflow.mint(makeBig(1000));
    await superflow.connect(user1).mint(makeBig(1000));
    await matic.transfer(user1.address, makeBig(1000));
  });

  describe('Deployment', () => {
    it('should deploy the contracts', async () => {
      expect(await matic.totalSupply()).to.equal(makeBig(2000));
      expect(await superflow.totalSupply()).to.equal(makeBig(2000));
      expect(await amm.target).to.exist;
    });
  });

  describe('Provide liquidity', () => {
    it('should allow a user to provide liquidity', async () => {
      await provideLiquidity(owner);
      const [totalmatic, totalGoverflow, totalShares] = await amm.getPoolDetails();
      expect(totalmatic).to.equal(makeBig(100));
      expect(totalGoverflow).to.equal(makeBig(100));
      expect(totalShares).to.equal(makeBig(100));
    });
  });

  describe('Swaps', () => {
    it('should be possible to swap matic for goflow', async () => {
      await provideLiquidity(owner);
      await matic.approve(amm.target, makeBig(100)); // approve before we can move with transferFrom

      const tx = await amm.swapMatic(makeBig(100));
      await tx.wait();

      expect(tx.hash).to.exist;
      expect(await matic.balanceOf(amm.target)).to.equal(makeBig(200));
      expect(await superflow.balanceOf(amm.target)).to.equal(makeBig(50));
    });

    it('should be possible to swap goflow for matic', async () => {
      await provideLiquidity(owner);
      await superflow.approve(amm.target, makeBig(100)); // approve before we can move with transferFrom

      const tx = await amm.swapSuperflow(makeBig(100));
      await tx.wait();

      expect(tx.hash).to.exist;
      expect(await matic.balanceOf(amm.target)).to.equal(makeBig(50));
      expect(await superflow.balanceOf(amm.target)).to.equal(makeBig(200));
    });
  });
})