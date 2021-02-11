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
  }


  useEffect(() => {
    if (clickedKey !== '') {
      setTimeout(() => {
        setClickedKey('');
      }, 80);
    }
  }, [clickedKey]);

  const onClickHandler = clickedKey => {
    setClickedKey(clickedKey.toUpperCase());
  };


  return (
      <StyledComponent>
        <PadButton
          text="Q"
          onClick={onClickHandler}
          active={clickedKey === 'Q'}
        />
        <PadButton
          text="W"
          onClick={onClickHandler}
          active={clickedKey === 'W'}
        />
        <PadButton
          text="E"
          onClick={onClickHandler}
          active={clickedKey === 'E'}
        />
        <PadButton
          text="A"
          onClick={onClickHandler}
          active={clickedKey === 'A'}
        />
        <PadButton
          text="S"
          onClick={onClickHandler}
          active={clickedKey === 'S'}
        />
        <PadButton
          text="D"
          onClick={onClickHandler}
          active={clickedKey === 'D'}
        />
        <PadButton
          text="Y"
          onClick={onClickHandler}
          active={clickedKey === 'Y'}
        />
        <PadButton
          text="X"
          onClick={onClickHandler}
          active={clickedKey === 'X'}
        />
        <PadButton
          text="C"
          onClick={onClickHandler}
          active={clickedKey === 'C'}
        />
      </StyledComponent>
  );
};

export default Pads;
