import { useMutation } from '@tanstack/react-query'
import { WalletClient } from 'wagmi'

import useAmmContract from './contracts/useAmmContract';

interface UseSwapPayload {
  maticAmount?: string;
  superAmount?: string;
}

const useSwap = (walletClient: WalletClient) => {
  const ammContract = useAmmContract(walletClient);

  const useSwapMatic = useMutation({ mutationFn: async ({ maticAmount }: UseSwapPayload) => {
        if (maticAmount) {

          await ammContract.swapMaticForSuper(maticAmount);
        }
      },
    });

  const useSwapSuper = useMutation({ mutationFn: async ({ superAmount }: UseSwapPayload) => {
    if (superAmount) {
      await ammContract.swapSuperForMatic(superAmount);
    }
  },
  });

  return { useSwapMatic, useSwapSuper };
};

export default useSwap;
