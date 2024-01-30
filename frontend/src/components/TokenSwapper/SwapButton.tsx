import * as React from 'react';
import { StyledSwapButton } from './TokenSwapper.styled';

interface SwapButtonProps {
    handleClick: () => void;
    isLoading: boolean;
}

const SwapButton: React.FC<SwapButtonProps> = ({
    handleClick,
    isLoading
}) => {

    return (
        <StyledSwapButton onClick={handleClick}>
            { isLoading ? '...tx pending' : 'Swap' }
        </StyledSwapButton>
    )
};

export default SwapButton;
