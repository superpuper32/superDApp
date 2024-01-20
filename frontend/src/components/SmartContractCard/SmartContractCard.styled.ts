import styled from "styled-components";

export const StyledSmartContractCard = styled.div`
    width: 250px;
    height: 300px;
    border: 1px solid rgb(100, 108, 255);
    background-color: rgba(100, 108, 255, 0.08);
    border-radius: 20px;
    margin: 5px;
    padding: 16px 16px 8px;

    h3 {
        color: rgb(69, 76, 225);
    }

    p {
        color: rgb(69, 76, 225);
    }

    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;