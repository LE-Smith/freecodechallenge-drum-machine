import React from 'react';
import styled from 'styled-components';

const StyledComponent = styled.div`
  background-color: ${props => (props.active ? 'orange' : '#aaa')};
  height: 29%;
  width: 29%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${props =>
    props.active ? '1px 1px 5px orange' : '1px 1px 5px black'};
  font-weight: bold;
  font-size: 18px;
  transform: ${props =>
    props.active ? 'translateX(1px) translateY(1px)' : 'none'};
  cursor: pointer;
`;

const PadButton = props => {
  return (
    <StyledComponent
      active={props.active}
      id={props.src}
      className="drum-pad"
    >
      {props.text}
      <audio src={props.src} className="clip" id={props.text} />
    </StyledComponent>
  );
};

export default PadButton;
