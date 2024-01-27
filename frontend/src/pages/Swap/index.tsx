import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

import TokenSwapper from '../../components/TokenSwapper'
import { StyledContainer } from '../../components/styles/Container.styled'
import useAmmContract from '../../hooks/contracts/useAmmContract'
import useSwap from '../hooks/useSwap'

const Swap = () => {
  const [fromMaticText, setFromMaticText] = useState('');
  const [fromSuperText, setFromSuperText] = useState('');
  const [isMaticToGoflow, setIsMatic] = useState(true);

  const ammContract = useAmmContract();
  const { address, isConnected } = useAccount();
  const { useSwapMatic, useSwapSuper } = useSwap();
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
      setFromSuperText('');
    } else {
      const parsedValue = parse(value);
      
      if (isMatic) {
        setFromMaticText(parsedValue);
        const superEstimate = await ammContract.getSwapMaticEstimate(parsedValue);
        setFromSuperText(superEstimate);
      } else {
        setFromSuperText(parsedValue);
        const maticEstimate = await ammContract.getSwapSuperEstimate(parsedValue);
        setFromMaticText(maticEstimate);
      }
    }
  };

  return (
    <>
      <StyledContainer>
          <TokenSwapper
            changeHandler={handleChange}
            amount={isMaticToGoflow ? fromMaticText : fromSuperText}
            isMatic={isMaticToGoflow}
            isFrom={true}
          />
          
        </StyledContainer>
    </>
  )
}

export default Swap;
