import * as React from 'react'
import { useWalletClient } from 'wagmi'

import TokenSwapper from '../../components/TokenSwapper'
import { StyledContainer } from '../../components/styles/Container.styled'

const Swap: React.FC = () => {
  const { data: walletClient, isError, isLoading  } = useWalletClient();

  if (isLoading) return 'Loading...';
  if (isError) return 'Wallet not connected!';

  return (
    <>
      {walletClient &&
        <StyledContainer>
          <TokenSwapper walletClient={walletClient} />

        </StyledContainer>
      }
    </>
  );
};

export default Swap;
