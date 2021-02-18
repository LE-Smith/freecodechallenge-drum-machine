import React, { useEffect } from 'react';
import styled from 'styled-components';

import PadButton from '../components/PadButton';

const StyledComponent = styled.div`
  width: 60%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  user-select: none;
  opacity: ${props => props.powerIsOn ? 1.0 : 0.4};

  @media (max-width: 650px) {
    width: 100%;
    height: 50%;
  }
`;

const Pads = props => {

  const activeBank = props.activeBank;

  const PadButtons = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].map(
    (char, index) => {
      return (
        <PadButton
          src={activeBank[char]}
          key={index}
          text={char}
          active={props.clickedKeys.hasOwnProperty(char)}
          />
      );
    }
  );

  return <StyledComponent powerIsOn={props.powerIsOn} id="pads-wrapper">{PadButtons}</StyledComponent>;
};

export default Pads;
