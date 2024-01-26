import { useState } from 'react';
import { StyledTokenSwapperInput } from './TokenSwapperInput.styled';
import { StyledFlex } from '../styles/Flex.styled';

interface ITokenSwapperInput {
  labelText: string,
  token: string
}

const TokenSwapperInput: React.FC<ITokenSwapperInput> = ({
  labelText,
  token
}): JSX.Element => {
  const [inputFrom, setInputFrom] = useState(Number(1).toFixed(2));

  const handleInput = (e: any) => setInputFrom(e.target.value);
  
  return (
    <StyledTokenSwapperInput>
      <label className="form_label">
        <div className="stack">
          <p className="text">{labelText}</p>
        </div>
      </label>
      <StyledFlex>
        <div className="numberinput">
          <input
            type="number"
            step="0.01"
            id="from"
            aria-readonly="false"
            aria-required="false"
            role="spinbutton"
            aria-valuetext="1.00 MATIC"
            className="numberinput__field"
            value={inputFrom}
            onChange={handleInput}
          />
        </div>
        <div className="token">
          {token}
        </div>
      </StyledFlex>
    </StyledTokenSwapperInput>
  );
};

export default TokenSwapperInput;
