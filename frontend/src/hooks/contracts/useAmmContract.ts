import { useContractRead } from 'wagmi'
import { getContract, getWalletClient } from 'wagmi/actions'



import AmmContractAbi from '../../../../artifacts/contracts/AMM.sol/AMM.json';
// import useMaticContract from './useMaticContract';
// import useSuperContract from './useSuperContract';
import { makeBig, makeNum } from '../../lib/number-utils';

const AMM_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

interface PoolDetails {
  data: {
    totalMatic: string;
    totalGoflow: string;
    totalShares: string;
  };
}

interface UserHoldings {
  userMatic: string;
  userSuper: string;
  userShares: string;
}

const useAmmContract = () => {
  // const walletClient = await getWalletClient();
  const contract = getContract({
    address: AMM_ADDRESS,
    abi: AmmContractAbi.abi,
    // walletClient,
  });
  
  // const getPoolDetails = async (): Promise<PoolDetails> => {
  //   const { data }: PoolDetails = useContractRead({
  //       address: AMM_ADDRESS,
  //       abi: AmmContractAbi.abi,
  //       functionName: 'getPoolDetails',
  //   });

  //   // Convert from BigNumber to human readable strings for front-end
  //   return { data };
  // };

  // const getUserHoldings = async (address: string): Promise<UserHoldings> => {
  //   const userHoldings = await contract.getMyHoldings(address);

  //   // Convert from BigNumber to human readable strings for front-end
  //   return {
  //     userMatic: makeNum(userHoldings.maticAmount),
  //     userSuper: makeNum(userHoldings.superAmount),
  //     userShares: makeNum(userHoldings.myShare),
  //   };
  // };

  const getSwapMaticEstimate = async (amountMatic: string): Promise<string> => {
    // find out the amount of SUPER we get for a given amount of MATIC
    const superEstimateBN = await contract.read.getSwapMaticEstimate([ makeBig(amountMatic) ]);
    return makeNum(superEstimateBN);
  };

  const getSwapSuperflowEstimate = async (amountSuper: string): Promise<string> => {
    // find out the amount of MATIC we get for a given amount of SUPER
    const maticEstimateBN = await contract.read.getSwapSuperflowEstimate([ makeBig(amountSuper) ]);
    return makeNum(maticEstimateBN);
  };

  // const swapMaticForSuper = async (amountMatic: string): Promise<void> => {
  //   const amountMaticBN = makeBig(amountMatic);

  //   await maticContract.approve(contract.address, amountMaticBN);

  //   const swapTx = await contract.swapMatic(amountMaticBN);
  //   await swapTx.wait();
  // };

  // const swapSuperForMatic = async (amountSuper: string): Promise<void> => {
  //   const amountSuperBN = makeBig(amountSuper);

  //   await superContract.approve(contract.address, amountSuperBN);

  //   const swapTx = await contract.swapSuper(amountSuperBN);
  //   await swapTx.wait();
  // };

  return {
    // getPoolDetails,
    // getUserHoldings,
    getSwapMaticEstimate,
    getSwapSuperflowEstimate,
    // swapMaticForSuper,
    // swapSuperForMatic,
  };
};

export default useAmmContract;
