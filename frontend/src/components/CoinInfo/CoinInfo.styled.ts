import styled from "styled-components";

export const StyledCoinInfo = styled.div`
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border: 1px solid;
    border-color: ${({ theme }) => theme.text};
    padding: 20px;
    margin: 40px 20px;
    border-radius: 20px;

    img {
        width: 30px;
    }
`;