import styled from "styled-components";

export const StyledNav = styled.div`
    display: flex;

    a {
        margin-right: 0.375rem;
        color: ${({ theme }) => theme.text};
        text-decoration: none;
    }

    .active {
        border-bottom: 1px solid;
        border-color: ${({ theme }) => theme.text};
    }

    .pending {
        border: 1px solid;
        border-color: ${({ theme }) => theme.text};
    }
`;