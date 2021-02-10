import React from 'react';
import styled from 'styled-components'



const StyledComponent = styled.div`
    width: 40%;
    height: 100%;
    background-color: green;
    padding: 10px;
    box-sizing: border-box;

    @media (max-width: 650px) {
        width: 100%;
        height: 50%;
    }
`;

const MenuWrapper = props => {

    return (
        <StyledComponent>

        </StyledComponent>
    )
}

export default MenuWrapper;