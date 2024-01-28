import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers } from 'hardhat';
// import { Contract, ContractFactory } from 'ethers';

const makeBig = (value: string | number) => {
  if (typeof value === 'number') {
    value = value.toString();
  }
  return ethers.parseUnits(value);
};

async function main() {
  // let's get a another SignerWithAddress to upvote a question
  const [owner, user1] = await ethers.getSigners();
  // these addresses should match Account #0 & #1 from our local node
  console.log('With each deployment to the localhost...');
  console.log('...these addresses will stay the same');
  console.log('owner address: ', owner.address);
  console.log('user1 address: ', user1.address, '\n');

  // deploy the contracts
  const superToken = await ethers.deployContract('Super');
  await superToken.waitForDeployment();

  console.log('...these addresses may change');
  console.log('supertoken deployed to: ', superToken.target);

  // Connect to `user1` in order to mint, approve, and upvote an answer
  // We need to parse the token amount into a BigNumber of the correct unit
  const mintTx = await superToken.connect(user1).mint(makeBig('1000')); 
  await mintTx.wait();

  /**
   * PART 2: Add AMM contracts and liquidity
   */
  const matic = await ethers.deployContract('Matic');
  await matic.waitForDeployment();
  console.log('matic deployed to: ', matic.target);

  const amm = await ethers.deployContract('AMM', [matic.target, superToken.target]);
  await amm.waitForDeployment();
  console.log('AMM deployed to: ', amm.target);

  // mint more for AMM liquidity
  await superToken.mint(makeBig(1000));
  await superToken.connect(user1).mint(makeBig(1000));
  // Owner mints 2000 matic ond deploy, transfers 1000 from owner to user1
  await matic.transfer(user1.address, makeBig(1000));

  const provideLiquidity = async (user: SignerWithAddress, allowAmount = 1_000, provideAmount = 100) => {
    const allow = makeBig(allowAmount); // 1000
    const provide = makeBig(provideAmount); // 100

    const approve = await superToken.connect(user).approve(amm.target, allow);
    await approve.wait();
    const approve2 = await matic.connect(user).approve(amm.target, allow);
    await approve2.wait();

    const liquidity = await amm.connect(user).provide(provide, provide);
    await liquidity.wait();
  };

  await provideLiquidity(owner); // owner approves AMM to transfer 1000 of each token & provides 100 of each token to the AMM contract
  await provideLiquidity(user1); // user1
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });