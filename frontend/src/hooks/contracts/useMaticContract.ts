import { getContract, getWalletClient } from 'wagmi/actions'
import type { BigNumberish } from 'ethers';

import { makeNum } from '../../lib/number-utils';
import MaticContract from '../../../../artifacts/contracts/Matic.sol/Matic.json';

export type Amount = BigNumberish;

const useMaticContract = () => {
  const walletClient = getWalletClient();

  const contract = getContract({
    address: '0x0000000000000000000000000000000000000001',
    abi: MaticContract.abi,
    walletClient,
  });

  const getBalance = async (address: string): Promise<string> => {
    const userBalanceBN = await contract.balanceOf(address);
    return makeNum(userBalanceBN);
  };

  const approve = async (address: string, amount: Amount): Promise<void> => {
    const tx = await contract.approve(address, amount);
    await tx.wait();
  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    approve,
    getBalance,
  };
};

export default useMaticContract;