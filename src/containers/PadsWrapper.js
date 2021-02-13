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

const bankA = {
  "Q": new Audio("./audio/korg_ddd_1/bass1.wav"),
  "W": new Audio("./audio/korg_ddd_1/bass2.wav"),
  "E": new Audio("./audio/korg_ddd_1/claps.wav"),
  "A": new Audio("./audio/korg_ddd_1/clhh1.wav"),
  "S": new Audio("./audio/korg_ddd_1/crash.wav"),
  "D": new Audio("./audio/korg_ddd_1/snare1.wav"),
  "Y": new Audio("./audio/korg_ddd_1/snare2.wav"),
  "X": new Audio("./audio/korg_ddd_1/tom2.wav"),
  "C": new Audio("./audio/korg_ddd_1/tom3.wav")
}

const bankB = {
  "Q": new Audio("./audio/technics_pcm_dp50/BD.wav"),
  "W": new Audio("./audio/technics_pcm_dp50/Clap.wav"),
  "E": new Audio("./audio/technics_pcm_dp50/Conga1.wav"),
  "A": new Audio("./audio/technics_pcm_dp50/Conga2.wav"),
  "S": new Audio("./audio/technics_pcm_dp50/Ride.wav"),
  "D": new Audio("./audio/technics_pcm_dp50/Snare.wav"),
  "Y": new Audio("./audio/technics_pcm_dp50/Tom2.wav"),
  "X": new Audio("./audio/technics_pcm_dp50/Tom3.wav"),
  "C": new Audio("./audio/technics_pcm_dp50/Tom4.wav")
}

const playAudioForKey = key => {
  const audio = bankB[key];
  audio.play();
}

const stopAudioForKey = key => {
  const audio = bankB[key];
  audio.pause();
  audio.currentTime = 0;
}

const Pads = props => {
  const [clickedKeys, setClickedKeys] = useState({});
  const clickedKeysRef = useRef(clickedKeys);
  clickedKeysRef.current = clickedKeys;
 
  const addKeyToClickedKeys = (key, pressedBy) => {
    const newClickedKeys = { ...clickedKeysRef.current, [key]: pressedBy };
    setClickedKeys(newClickedKeys);
    playAudioForKey(key);
  };
  
  const RemoveKeyFromClickedKeys = key => {
    const newClickedKeys = { ...clickedKeysRef.current };
    delete newClickedKeys[key];
    setClickedKeys(newClickedKeys);
    stopAudioForKey(key);
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

    const onMouseDownHandler = event => {
      const key = event.target.innerText.toUpperCase();
      if (!clickedKeysRef.current.hasOwnProperty(key) && key.length === 1) {
        addKeyToClickedKeys(key, 'mouse');
      }
    };

    const onMouseUpOrOutHandler = event => {
      const key = event.target.innerText ? event.target.innerText.toUpperCase() : '';
      if (clickedKeysRef.current[key] === 'mouse'  && key.length === 1)  {
        RemoveKeyFromClickedKeys(key);
      }
    };
    
    document.addEventListener('keydown', onKeyDownHandler);
    document.addEventListener('keyup', onKeyUpHandler);
    document.addEventListener('mousedown', onMouseDownHandler);
    document.addEventListener('mouseup', onMouseUpOrOutHandler);
    document.addEventListener('mouseout', onMouseUpOrOutHandler);
    
    return () => {
      document.removeEventListener('keydown', onKeyDownHandler);
      document.removeEventListener('keyup', onKeyUpHandler);
      document.removeEventListener('mousedown', onMouseDownHandler);
      document.removeEventListener('mouseup', onMouseUpOrOutHandler);
      document.removeEventListener('mouseout', onMouseUpOrOutHandler);
    };
  }, []);


  const PadButtons = ['Q', 'W', 'E', 'A', 'S', 'D', 'Y', 'X', 'C'].map(
    (char, index) => {
      return (
        <PadButton
          key={index}
          text={char}
          active={clickedKeys.hasOwnProperty(char)}
        />
      );
    }
  );

  return <StyledComponent>{PadButtons}</StyledComponent>;
};

export default Pads;
