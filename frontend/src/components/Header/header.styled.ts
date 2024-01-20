import styled from "styled-components";

export const StyledHeader = styled.header`
    background-color: ${({ theme }) => theme.background};
    padding: 20px 50px;
    width: 100vw;

    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;