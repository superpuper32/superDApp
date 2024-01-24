import { ethers } from 'hardhat';

async function main() {
  const superflow = await ethers.deployContract('Superflow');
  await superflow.waitForDeployment()
  
  console.log('Superflow token deployed to: ', superflow.target);

  const mintTx = await superflow.mint(ethers.parseUnits('1000'));
  await mintTx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });