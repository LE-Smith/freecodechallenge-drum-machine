import React from 'react';
import styled from 'styled-components';


const StyledComponent = styled.div`
    background-color: #aaa;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
`;

const Display = props => {
    return (
        <StyledComponent id="display">
            {props.text}
        </StyledComponent>
    )
}

export default Display;