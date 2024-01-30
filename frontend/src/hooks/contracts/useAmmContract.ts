// import { useContractRead } from 'wagmi'
import { WalletClient } from 'wagmi'
import { getContract } from 'wagmi/actions'

import AmmContractAbi from '../../../../artifacts/contracts/AMM.sol/AMM.json';
import useMaticContract from './useMaticContract';
import useSuperContract from './useSuperContract';
import { makeBig, makeNum } from '../../lib/number-utils';

const AMM_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

// interface PoolDetails {
//   data: {
//     totalMatic: string;
//     totalGoflow: string;
//     totalShares: string;
//   };
// }

// interface UserHoldings {
//   userMatic: string;
//   userSuper: string;
//   userShares: string;
// }

const useAmmContract = (walletClient: WalletClient) => {
  const contract = getContract({
    address: AMM_ADDRESS,
    abi: AmmContractAbi.abi,
    walletClient,
  });

  const maticContract = useMaticContract(walletClient);
  const superContract = useSuperContract(walletClient);

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
  //   const userHoldings = await contract.read.getMyHoldings([ address ]);

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

  const swapMaticForSuper = async (amountMatic: string): Promise<void> => {
    const amountMaticBN = makeBig(amountMatic);

    console.log('contract.address', contract);
    await maticContract.approve(contract.address, amountMaticBN);

    const swapTx = await contract.write.swapMatic([ amountMaticBN ]);
    console.log('swapMaticForSuper swapTx =', swapTx);
  };

  const swapSuperForMatic = async (amountSuper: string): Promise<void> => {
    const amountSuperBN = makeBig(amountSuper);

    await superContract.approve(contract.address, amountSuperBN);

    const swapTx = await contract.write.swapSuperflow([ amountSuperBN ]);
    console.log('swapSuperForMatic swapTx =', swapTx);
  };

  return {
    // getPoolDetails,
    // getUserHoldings,
    getSwapMaticEstimate,
    getSwapSuperflowEstimate,
    swapMaticForSuper,
    swapSuperForMatic,
  };
};

export default useAmmContract;
