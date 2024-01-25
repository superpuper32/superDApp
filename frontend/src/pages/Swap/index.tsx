import { useState } from 'react'
// import { useAccount } from 'wagmi'

import TokenSwapperInput from '../../components/TokenSwapper';
import { StyledContainer } from '../../components/styles/Container.styled'
// import useAmmContract from '../../hooks/contracts/useAmmContract'

const Swap = () => {
  const [fromMaticText, setFromMaticText] = useState('')
  const [fromGoflowText, setFromGoflowText] = useState('')
  const [isMaticToGoflow, setIsMatic] = useState(true);

  // const { address, isConnected } = useAccount()
  // const ammContract = useAmmContract()

  const handleChange = () => {};

  return (
    <>
      <StyledContainer>
          <TokenSwapperInput
            changeHandler={handleChange}
            amount={isMaticToGoflow ? fromMaticText : fromGoflowText}
            isMatic={isMaticToGoflow}
            isFrom={true}
          />
          
        </StyledContainer>
    </>
  )
}

export default Swap
