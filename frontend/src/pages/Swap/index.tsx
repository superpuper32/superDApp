import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

import TokenSwapper from '../../components/TokenSwapper'
import { StyledContainer } from '../../components/styles/Container.styled'
import useAmmContract from '../../hooks/contracts/useAmmContract'
import useSwap from '../hooks/useSwap'

const Swap = () => {
  const [fromMaticText, setFromMaticText] = useState('')
  const [fromGoflowText, setFromGoflowText] = useState('')
  const [isMaticToGoflow, setIsMatic] = useState(true);

  const ammContract = useAmmContract();
  const { address, isConnected } = useAccount();
  const { useSwapMatic, useSwapGoflow } = useSwap();
  const { poolDetailsQuery, userHoldingsQuery } = useAmmDetails();

  const parse = (val: string) => {
    return val.replace(/ [a-zA-Z]+/i, '');
  };

  useEffect(() => {
    handleChange(isMaticToGoflow, '1.00');
  }, [poolDetailsQuery.data]);

  const handleChange = async (isMatic: boolean, value: string | undefined) => {
    if (!value) {
      setFromMaticText('');
      setFromGoflowText('');
    } else {
      const parsedValue = parse(value);
      
      if (isMatic) {
        setFromMaticText(parsedValue);
        const goflowEstimate = await ammContract.getSwapMaticEstimate(parsedValue);
        setFromGoflowText(goflowEstimate);
      } else {
        setFromGoflowText(parsedValue);
        const maticEstimate = await ammContract.getSwapGoflowEstimate(parsedValue);
        setFromMaticText(maticEstimate);
      }
    }
  };

  return (
    <>
      <StyledContainer>
          <TokenSwapper
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
