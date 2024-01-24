import { getContract, getWalletClient } from 'wagmi/actions'
import type { BigNumberish } from 'ethers';

import SuperflowContract from '../../../../artifacts/contracts/SuperToken.sol/Superflow.json';
import { makeNum } from '../../lib/number-utils';

export type Amount = BigNumberish;

export interface Transfer {
  from: string;
  to: string;
  amount: BigNumberish;
}

const useSuperflowContract = () => {
  const walletClient = getWalletClient();

  const contract = getContract({
    address: '0x0000000000000000000000000000000000000001',
    abi: SuperflowContract.abi,
    walletClient,
  });

  const getBalance = async (address: string): Promise<string> => {
    const userBalanceBN = await contract.balanceOf(address);
    return makeNum(userBalanceBN);
  };

  const approve = async (address: string, amount: BigNumberish): Promise<void> => {
    const tx = await contract.approve(address, amount);
    await tx.wait();
  };

  const mint = async (amount: BigNumberish): Promise<void> => {
    const tx = await contract.mint(amount);
    await tx.wait();
  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    mint,
    approve,
    getBalance,
  };
};

export default useSuperflowContract;
