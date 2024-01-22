import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  // const Superflow: ContractFactory = await ethers.getContractFactory('Superflow');
  // const superflow: Contract = await Superflow.deploy();

  const superflow = await ethers.deployContract('Superflow');
  
  console.log('superflow token deployed to: ', superflow.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
