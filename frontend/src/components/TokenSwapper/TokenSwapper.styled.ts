import styled from "styled-components";
import { ThemeProps } from '../../styles/themes';

type GlobalThemeProps = {
  theme: ThemeProps;
};

export const StyledTokenSwapperInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.75rem;
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.background_input};
    border-radius: 24px;
    color: ${({ theme }) => theme.text};
    font-weight: 700;

    .form_label {
        display: block;
        text-align: start;
        font-size: 1rem;
        margin-inline-end: 0.75rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
        opacity: 1; 

        .stack {
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            flex-direction: row;
            gap: 0.5rem;

            .text {
                color: inherit;
                font-weight: 600;
            }
        }
    }

    .numberinput {
        position: relative;
        z-index: 0;
        width: 70%;
        
        &__field {
            font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica, 'Apple Color Emoji',Arial,sans-serif,'Segoe UI Emoji', 'Segoe UI Symbol';
            width: 100%;
            height: 3rem;
            font-size: 1.125rem;
            padding-inline-start: 1rem;
            padding-inline-end: 1rem;
            border-radius: 0.75rem;
            min-width: 0px;
            outline: 0px solid transparent;
            outline-offset: 2px;
            position: relative;
            appearance: none;
            vertical-align: top;
            border: 0px solid;
            border-color: inherit;
            background: ${({ theme }) => theme.background_form};
            color: ${({ theme }) => theme.text};
            font-weight: 700;
        }
    }

    .token {
        height: 100%;
        width: 20%;
        text-align: right;
        display: flex;
        justify-content: center;
    }
`;


export const StyledSwapperVertButton = styled.button`
    position: relative;
    top: 0;
    left: calc(50% - 50px);
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.background_form};
    outline: none;
    border: 0px solid;
    padding: 8px;
    border-radius: 4px;
`;

export const StyledSwapButton = styled.button`
    display: block;
    width: 90%;
    padding: 1rem;
    margin: 2rem auto;
    outline: none;
    border: 0px solid;
    border-radius: 20px;
    color: ${({ theme }) => theme.text};
    background: linear-gradient( 180deg, #BF5AF2 0%, #FF2D55 100% );
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 600;
`;