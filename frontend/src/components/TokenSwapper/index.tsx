import * as React from 'react';

import TokenSwapperInput from './TokenSwapperInput';

interface TokenSwapperProps {
  changeHandler: (isMatic: boolean, amount: string) => void;
  amount: string;
  isMatic: boolean;
  isFrom: boolean;
}


const TokenSwapper: React.FunctionComponent<TokenSwapperProps> = ({
    changeHandler,
    amount,
    isMatic,
    isFrom
}) => {
  
  return (
    <>
    <TokenSwapperInput labelText="You pay" token='MATIC'  />
    <TokenSwapperInput labelText="You receive" token='SUPERFLOW' />
    </>
  );
};

export default TokenSwapper;