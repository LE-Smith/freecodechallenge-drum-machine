import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PadButton from '../components/PadButton';

const StyledComponent = styled.div`
  width: 60%;
  height: 100%;
  /* background-color: purple; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;

  @media (max-width: 650px) {
    width: 100%;
    height: 50%;
  }
`;

const Pads = props => {
  const [clickedKey, setClickedKey] = useState('');
  let keyIsClicked = false;

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler);
    document.addEventListener('keyup', onKeyUpHandler);

    return (() => {
      document.removeEventListener('keydown', onKeyDownHandler);
      document.removeEventListener('keyup', onKeyUpHandler);

    })
  }, []);
  
  const onKeyDownHandler = event => {
    if (!keyIsClicked) {
      keyIsClicked = true;
      if (clickedKey !== event.key.toUpperCase()) {
        setClickedKey(event.key.toUpperCase());
      }
    }
  }

  const onKeyUpHandler = event => {
    keyIsClicked = false;
    setClickedKey('');
  }

  const onMouseDownHandler = clickedKey => {
    setClickedKey(clickedKey.toUpperCase());
  };

  const onMouseUpHandler = () => {
    setClickedKey('');
  };


  return (
      <StyledComponent>
        <PadButton
          text="Q"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKey === 'Q'}
        />
        <PadButton
          text="W"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKey === 'W'}
        />
        <PadButton
          text="E"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKey === 'E'}
        />
        <PadButton
          text="A"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKey === 'A'}
        />
        <PadButton
          text="S"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKey === 'S'}
        />
        <PadButton
          text="D"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKey === 'D'}
        />
        <PadButton
          text="Y"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKey === 'Y'}
        />
        <PadButton
          text="X"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKey === 'X'}
        />
        <PadButton
          text="C"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKey === 'C'}
        />
      </StyledComponent>
  );
};

export default Pads;
