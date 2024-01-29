import { useState, useEffect } from 'react'
// import { useAccount } from 'wagmi'

import useAmmContract from '../../hooks/contracts/useAmmContract';
import TokenSwapperInput from './TokenSwapperInput';
import { StyledSwapperVertButton } from './TokenSwapperInput.styled';

const TokenSwapper = () => {
    const [fromMaticText, setFromMaticText] = useState('');
    const [fromSuperText, setFromSuperText] = useState('');
    const [isMaticToSuper, setIsMatic] = useState(true);

    // const { address, isConnected } = useAccount();
    const ammContract = useAmmContract();

    const parse = (val: string) => {
        return val.replace(/ [a-zA-Z]+/i, '');
    };

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
                const maticEstimate = await ammContract.getSwapSuperflowEstimate(parsedValue);
                setFromMaticText(maticEstimate);
            }
        }
    };

    useEffect(() => {
        handleChange(isMaticToSuper, '1.00');
    }, []);
  
  return (
    <>
        <TokenSwapperInput
            changeHandler={handleChange}
            amount={isMaticToSuper ? fromMaticText : fromSuperText}
            isMatic={isMaticToSuper}
            isFrom={true}
        />

        <StyledSwapperVertButton onClick={() => setIsMatic((current) => !current)}>revert</StyledSwapperVertButton>

        <TokenSwapperInput
            changeHandler={handleChange}
            amount={isMaticToSuper ? fromSuperText : fromMaticText}
            isMatic={!isMaticToSuper}
            isFrom={false}
        />


    </>
  );
};

export default TokenSwapper;