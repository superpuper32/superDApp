import { useMutation } from '@tanstack/react-query'
import useAmmContract from './contracts/useAmmContract';

interface UseSwapPayload {
  maticAmount?: string;
  superAmount?: string;
}

const useSwap = () => {
  const ammContract = useAmmContract();

  const useSwapMatic = useMutation(async ({ maticAmount }: UseSwapPayload) => {
    if (maticAmount) {
      await ammContract.swapMaticForSuper(maticAmount);
    }
  });

  const useSwapSuper = useMutation(async ({ superAmount }: UseSwapPayload) => {
    if (superAmount) {
      await ammContract.swapSuperForMatic(superAmount);
    }
  });

  return { useSwapMatic, useSwapSuper };
};

export default useSwap;
