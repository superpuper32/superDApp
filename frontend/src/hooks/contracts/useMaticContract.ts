import { WalletClient } from 'viem';
import { getContract } from 'wagmi/actions'
import type { BigNumberish } from 'ethers';

import { makeNum } from '../../lib/number-utils';
import MaticContract from '../../../../artifacts/contracts/Matic.sol/Matic.json';

export type Amount = BigNumberish;

const MATIC_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const useMaticContract = (walletClient: WalletClient) => {
  const contract = getContract({
    address: MATIC_ADDRESS,
    abi: MaticContract.abi,
    walletClient,
  });

  const getBalance = async (address: string): Promise<string> => {
    const userBalanceBN = await contract.read.balanceOf([address]);
    
    return makeNum(userBalanceBN);
  };

  const approve = async (address: string, amount: Amount): Promise<void> => {
    const tx = await contract.write.approve([ address, amount ]);
    console.log('approve matic tx', tx);
  };

  return {
    contract,
    // chainId: contract.provider.network?.chainId,
    approve,
    getBalance,
  };
};

export default useMaticContract;