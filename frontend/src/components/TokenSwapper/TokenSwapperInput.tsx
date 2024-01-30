import { StyledTokenSwapperInput } from './TokenSwapper.styled';
import { StyledFlex } from '../styles/Flex.styled';

interface TokenSwapperInputProps {
  changeHandler: (isMatic: boolean, amount: string) => void;
  amount: string;
  isMatic: boolean;
  isFrom: boolean;
}

const TokenSwapperInput: React.FC<TokenSwapperInputProps> = ({
  changeHandler,
  amount,
  isMatic,
  isFrom
}): JSX.Element => {
  return (
    <StyledTokenSwapperInput>
      <label className="form_label">
        <div className="stack">
          <p className="text">{isFrom ? "You pay" : "You receive"}</p>
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
            value={amount}
            onChange={(e) => changeHandler(isMatic, e.target.value)}

          />
        </div>
        <div className="token">
          {isMatic ? ' MATIC' : ' SUPER'}
        </div>
      </StyledFlex>
    </StyledTokenSwapperInput>
  );
};

export default TokenSwapperInput;
