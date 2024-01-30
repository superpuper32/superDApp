import { QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        'Network Error: Ensure Wallet is connected & on the same network that your contract is deployed to.'
      );
    },
  }),
});
