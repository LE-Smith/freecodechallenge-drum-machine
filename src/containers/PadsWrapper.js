import React, { useState, useEffect, useRef } from 'react';
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

  @media (max-width: 650px) {
    width: 100%;
    height: 50%;
  }
`;

const Pads = props => {
  const [clickedKeys, setClickedKeys] = useState({});
  const clickedKeysRef = useRef(clickedKeys);
  clickedKeysRef.current = clickedKeys;

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler);
    document.addEventListener('keyup', onKeyUpHandler);

    return () => {
      document.removeEventListener('keydown', onKeyDownHandler);
      document.removeEventListener('keyup', onKeyUpHandler);
    };
  }, []);

  const onKeyDownHandler = event => {
    const key = event.key.toUpperCase();
    addKeyToClickedKeys(key, 'keyboard');
  };
  
  const onKeyUpHandler = event => {
    const key = event.key.toUpperCase();
    RemoveKeyFromClickedKeys(key, 'keyboard');
  };
  
  const addKeyToClickedKeys = (key, pressedBy) => {
    if (!clickedKeysRef.current.hasOwnProperty(key)) {
      const newClickedKeys = { ...clickedKeysRef.current, [key]: pressedBy };
      setClickedKeys(newClickedKeys);
    }
  };

  const RemoveKeyFromClickedKeys = (key, pressedBy) => {
    if (pressedBy === clickedKeysRef.current[key]) {
      const newClickedKeys = { ...clickedKeysRef.current };
      delete newClickedKeys[key];
      setClickedKeys(newClickedKeys);
    }
  };

  const onMouseDownHandler = clickedKey => {
    addKeyToClickedKeys(clickedKey, 'mouse');
  };

  const onMouseUpHandler = clickedKey => {
    RemoveKeyFromClickedKeys(clickedKey, 'mouse');
  };

  return (
    <StyledComponent>
      <PadButton
        text="Q"
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        active={clickedKeys.hasOwnProperty('Q')}
      />
      <PadButton
        text="W"
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        active={clickedKeys.hasOwnProperty('W')}
      />
      <PadButton
        text="E"
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        active={clickedKeys.hasOwnProperty('E')}
      />
      <PadButton
        text="A"
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        active={clickedKeys.hasOwnProperty('A')}
      />
      <PadButton
        text="S"
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        active={clickedKeys.hasOwnProperty('S')}
      />
      <PadButton
        text="D"
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        active={clickedKeys.hasOwnProperty('D')}
      />
      <PadButton
        text="Y"
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        active={clickedKeys.hasOwnProperty('Y')}
      />
      <PadButton
        text="X"
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        active={clickedKeys.hasOwnProperty('X')}
      />
      <PadButton
        text="C"
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        active={clickedKeys.hasOwnProperty('C')}
      />
    </StyledComponent>
  );
};

export default Pads;
