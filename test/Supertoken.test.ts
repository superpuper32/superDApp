import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Superflow", function () {
  let superflow: Contract, owner: SignerWithAddress, otherAccount: SignerWithAddress;

  const deployContract = async () => {
    const [_owner, _otherAccount] = await ethers.getSigners();

    superflow = await ethers.deployContract('Superflow');

    owner = _owner;
    otherAccount = _otherAccount;
  }

  const mint = async (user: SignerWithAddress, amount: number) => {
    const tx = await superflow.connect(user).mint(amount);
    await tx.wait();
  }

  beforeEach(async () => {
    await deployContract();
  })

  describe("Deployment", () => {
    it("Should deploy and return correct symbol", async () => {
      expect(await superflow.symbol()).to.equal("SUPERFLOW");
    });
  });

  describe("Minting", () => {
    it("Should mint tokens to user", async () => {
      await mint(owner, 100);
      expect(await superflow.balanceOf(owner.address)).to.equal(100);
    });
  });

  describe("Transfer", () => {
    it("Should transfer tokens to another account", async () => {
      await mint(owner, 100);

      await superflow.transfer(otherAccount.address, 100);
      expect(await superflow.balanceOf(owner.address)).to.equal(0);
      expect(await superflow.balanceOf(otherAccount.address)).to.equal(100);
    });
  });

  describe("TransferFrom", () => {
    it("Should approve a spender to be able to transfer owner's tokens", async () => {
      await mint(owner, 100);
      expect(await superflow.balanceOf(owner.address)).to.equal(100);

      const approve = await superflow.approve(otherAccount.address, 100);
      await approve.wait();

      const transferFrom = await superflow.connect(otherAccount).transferFrom(owner.address, otherAccount.address, 100);
      await transferFrom.wait();

      expect(await superflow.balanceOf(owner.address)).to.equal(0);
      expect(await superflow.balanceOf(otherAccount.address)).to.equal(100);
    });

    it("Should not allow a spender to transfer more tokens than they have", async () => {
      await mint(owner, 100);
      expect(await superflow.balanceOf(owner.address)).to.equal(100);

      await expect(superflow.approve(otherAccount.address, 200)).to.be.revertedWith('insufficient balance for approval!');
    });
  });
});