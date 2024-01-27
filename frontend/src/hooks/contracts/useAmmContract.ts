import { getContract, getWalletClient } from 'wagmi/actions'

import AmmContract from '../../../../artifacts/contracts/AMM.sol/AMM.json';
import useMaticContract from './useMaticContract';
import useSuperContract from './useSuperContract';
import { makeBig, makeNum } from '../../lib/number-utils';
// import { GetContractReturnType } from 'viem';

interface PoolDetails {
  totalMatic: string;
  totalSuper: string;
  totalShares: string;
}

interface UserHoldings {
  userMatic: string;
  userSuper: string;
  userShares: string;
}

// type TPoolDetails = [bigint, bigint, bigint]

const useAmmContract = () => {
  const walletClient = getWalletClient();
  
  const maticContract = useMaticContract();
  const superContract = useSuperContract();

  const contract = getContract({
    address: '0x0000000000000000000000000000000000000001',
    abi: AmmContract.abi,
    walletClient,
  });

  const getPoolDetails = async (): Promise<PoolDetails> => {
    const poolDetails = await contract.read.getPoolDetails();

    // Convert from BigNumber to human readable strings for front-end
    return {
      totalMatic: makeNum(poolDetails.maticAmount),
      totalSuper: makeNum(poolDetails.superAmount),
      totalShares: makeNum(poolDetails.ammShares),
    };
  };

  const getUserHoldings = async (address: string): Promise<UserHoldings> => {
    const userHoldings = await contract.getMyHoldings(address);

    // Convert from BigNumber to human readable strings for front-end
    return {
      userMatic: makeNum(userHoldings.maticAmount),
      userSuper: makeNum(userHoldings.superAmount),
      userShares: makeNum(userHoldings.myShare),
    };
  };

  const getSwapMaticEstimate = async (amountMatic: string): Promise<string> => {
    // find out the amount of SUPER we get for a given amount of MATIC
    const superEstimateBN = await contract.getSwapMaticEstimate(makeBig(amountMatic));
    return makeNum(superEstimateBN);
  };

  const getSwapSuperEstimate = async (amountSuper: string): Promise<string> => {
    // find out the amount of MATIC we get for a given amount of SUPER
    const maticEstimateBN = await contract.getSwapSuperEstimate(makeBig(amountSuper));
    return makeNum(maticEstimateBN);
  };

  const swapMaticForSuper = async (amountMatic: string): Promise<void> => {
    const amountMaticBN = makeBig(amountMatic);

    await maticContract.approve(contract.address, amountMaticBN);

    const swapTx = await contract.swapMatic(amountMaticBN);
    await swapTx.wait();
  };

  const swapSuperForMatic = async (amountSuper: string): Promise<void> => {
    const amountSuperBN = makeBig(amountSuper);

    await superContract.approve(contract.address, amountSuperBN);

    const swapTx = await contract.swapSuper(amountSuperBN);
    await swapTx.wait();
  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getPoolDetails,
    getUserHoldings,
    getSwapMaticEstimate,
    getSwapSuperEstimate,
    swapMaticForSuper,
    swapSuperForMatic,
  };
};

export default useAmmContract;
