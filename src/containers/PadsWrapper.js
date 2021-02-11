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
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

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

  const onMouseUpOrLeaveHandler = clickedKey => {
    RemoveKeyFromClickedKeys(clickedKey, 'mouse');
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
