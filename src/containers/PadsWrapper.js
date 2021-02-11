import React, { useState, useEffect, useRef } from 'react';
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
  const [clickedKeys, setClickedKeys] = useState([]);
  const clickedKeysRef = useRef(clickedKeys);
  clickedKeysRef.current = clickedKeys;

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler);
    document.addEventListener('keyup', onKeyUpHandler);

    return (() => {
      document.removeEventListener('keydown', onKeyDownHandler);
      document.removeEventListener('keyup', onKeyUpHandler);
    })
  }, []);
  
  const onKeyDownHandler = event => {
    const key = event.key.toUpperCase();
    addKeyToClickedKeys(key);
  }

  const onKeyUpHandler = event => {
    const key = event.key.toUpperCase();
    RemoveKeyFromClickedKeys(key);
    
  }

  const addKeyToClickedKeys = (key) => {
    if (!clickedKeysRef.current.includes(key)) {
      const newClickedKeys = [...clickedKeysRef.current];
      newClickedKeys.push(key);
      setClickedKeys(newClickedKeys);
    }
  }

  const RemoveKeyFromClickedKeys = (key) => {
    setClickedKeys(clickedKeysRef.current.filter(stateKey => stateKey!== key))
  } 


  const onMouseDownHandler = clickedKey => {
    addKeyToClickedKeys(clickedKey);
  };

  const onMouseUpHandler = (clickedKey) => {
    RemoveKeyFromClickedKeys(clickedKey);
  };


  return (
      <StyledComponent>
        <PadButton
          text="Q"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKeys.includes('Q')}
        />
        <PadButton
          text="W"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKeys.includes('W')}
        />
        <PadButton
          text="E"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKeys.includes('E')}
        />
        <PadButton
          text="A"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKeys.includes('A')}
        />
        <PadButton
          text="S"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKeys.includes('S')}
        />
        <PadButton
          text="D"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKeys.includes('D')}
        />
        <PadButton
          text="Y"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKeys.includes('Y')}
        />
        <PadButton
          text="X"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKeys.includes('X')}
        />
        <PadButton
          text="C"
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          active={clickedKeys.includes('C')}
        />
      </StyledComponent>
  );
};

export default Pads;
