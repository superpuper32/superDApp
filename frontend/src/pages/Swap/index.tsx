import * as React from 'react'

import TokenSwapper from '../../components/TokenSwapper'
import { StyledContainer } from '../../components/styles/Container.styled'

const Swap: React.FC = () => {
  return (
    <>
      <StyledContainer>
        <TokenSwapper />

      </StyledContainer>
    </>
  );
};

export default Swap;
