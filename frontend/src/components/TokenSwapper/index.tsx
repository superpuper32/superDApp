import { useState, useEffect } from 'react'
import { WalletClient } from 'wagmi';
import toast from 'react-hot-toast';

import useAmmContract from '../../hooks/contracts/useAmmContract';
import useSwap from '../../hooks/useSwap';

import TokenSwapperInput from './TokenSwapperInput';
import { StyledSwapperVertButton } from './TokenSwapper.styled';
import SwapButton from './SwapButton';


interface TokenSwapperProps {
    walletClient: WalletClient;
}

const TokenSwapper: React.FC<TokenSwapperProps> = ({ walletClient }) => {
    const [fromMaticText, setFromMaticText] = useState('');
    const [fromSuperText, setFromSuperText] = useState('');
    const [isMaticToSuper, setIsMatic] = useState(true);

    const ammContract = useAmmContract(walletClient);
    const { useSwapMatic, useSwapSuper } = useSwap(walletClient);

    const parse = (val: string) => {
        return val.replace(/ [a-zA-Z]+/i, '');
    };

    useEffect(() => {
        handleChange(isMaticToSuper, '1.00');
    }, []);

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

    const handleClick = async () => {
        try {
            if (isMaticToSuper) {
                await useSwapMatic.mutateAsync({ maticAmount: fromMaticText });
            } else {
                await useSwapSuper.mutateAsync({ superAmount: fromSuperText });
            }
            toast.success('Hey 👑. Nice Swap 😎', { duration: 5000 });
        } catch (e: any) {
            toast.error(e.data?.message || e.message);
        }
    };
  
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

        <SwapButton
            handleClick={handleClick}
            isLoading={useSwapMatic.isPending || useSwapSuper.isPending}
        />
    </>
  );
};

export default TokenSwapper;