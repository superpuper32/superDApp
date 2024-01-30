import { WalletClient } from 'viem';
import { getContract } from 'wagmi/actions'
import type { BigNumberish } from 'ethers';

import SuperContract from '../../../../artifacts/contracts/SuperToken.sol/Super.json';
import { makeNum } from '../../lib/number-utils';

const SUPERCONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export type Amount = BigNumberish;

export interface Transfer {
  from: string;
  to: string;
  amount: BigNumberish;
}

const useSuperContract = (walletClient: WalletClient) => {
  const contract = getContract({
    address: SUPERCONTRACT_ADDRESS,
    abi: SuperContract.abi,
    walletClient,
  });

  const getBalance = async (address: string): Promise<string> => {
    const userBalanceBN = await contract.read.balanceOf([ address ]);
    return makeNum(userBalanceBN);
  };

  const approve = async (address: string, amount: BigNumberish): Promise<void> => {
    const tx = await contract.write.approve([ address, amount ]);
    // await tx.wait();
    console.log('approve tx', tx);
  };

  const mint = async (amount: BigNumberish): Promise<void> => {
    // const tx = 
    await contract.write.mint([ amount ]);
    // await tx.wait();
  };

  return {
    contract,
    // chainId: contract.provider.network?.chainId,
    mint,
    approve,
    getBalance,
  };
};

export default useSuperContract;
