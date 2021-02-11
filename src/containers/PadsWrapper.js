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
  user-select: none;

  @media (max-width: 650px) {
    width: 100%;
    height: 50%;
  }
`;

const Pads = props => {
  const [clickedKeys, setClickedKeys] = useState({});
  const clickedKeysRef = useRef(clickedKeys);
  clickedKeysRef.current = clickedKeys;
  
  const addKeyToClickedKeys = (key, pressedBy) => {
    const newClickedKeys = { ...clickedKeysRef.current, [key]: pressedBy };
    setClickedKeys(newClickedKeys);
  };
  
  const RemoveKeyFromClickedKeys = key => {
    const newClickedKeys = { ...clickedKeysRef.current };
    delete newClickedKeys[key];
    setClickedKeys(newClickedKeys);
  };

  useEffect(() => {
    const onKeyDownHandler = event => {
      const key = event.key.toUpperCase();
      if (!clickedKeysRef.current.hasOwnProperty(key)) {
        addKeyToClickedKeys(key, 'keyboard');
      }
    };

    const onKeyUpHandler = event => {
      const key = event.key.toUpperCase();
      if (clickedKeysRef.current[key] === 'keyboard') {
        RemoveKeyFromClickedKeys(key);
      }
    };

    document.addEventListener('keydown', onKeyDownHandler);
    document.addEventListener('keyup', onKeyUpHandler);

    return () => {
      document.removeEventListener('keydown', onKeyDownHandler);
      document.removeEventListener('keyup', onKeyUpHandler);
    };
  }, []);

  const onMouseDownHandler = key => {
    if (!clickedKeysRef.current.hasOwnProperty(key)) {
      addKeyToClickedKeys(key, 'mouse');
    }
  };

  const onMouseUpOrLeaveHandler = key => {
    if (clickedKeysRef.current[key] === 'mouse') {
      RemoveKeyFromClickedKeys(key);
    }
  };

  const PadButtons = ['Q', 'W', 'E', 'A', 'S', 'D', 'Y', 'X', 'C'].map(
    (char, index) => {
      return (
        <PadButton
          key={index}
          text={char}
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpOrLeaveHandler}
          onMouseLeave={onMouseUpOrLeaveHandler}
          active={clickedKeys.hasOwnProperty(char)}
        />
      );
    }
  );

  return <StyledComponent>{PadButtons}</StyledComponent>;
};

export default Pads;
