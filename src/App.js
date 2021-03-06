import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import PadsWrapper from './containers/PadsWrapper';
import MenuWrapper from './containers/MenuWrapper';

const bankA = {
  "Q": "./audio/korg_ddd_1/bass1.wav",
  "W": "./audio/korg_ddd_1/bass2.wav",
  "E": "./audio/korg_ddd_1/claps.wav",
  "A": "./audio/korg_ddd_1/clhh1.wav",
  "S": "./audio/korg_ddd_1/crash.wav",
  "D": "./audio/korg_ddd_1/snare1.wav",
  "Z": "./audio/korg_ddd_1/snare2.wav",
  "X": "./audio/korg_ddd_1/tom2.wav",
  "C": "./audio/korg_ddd_1/tom3.wav"
}

const bankB = {
  "Q": "./audio/technics_pcm_dp50/BD.wav",
  "W": "./audio/technics_pcm_dp50/Clap.wav",
  "E": "./audio/technics_pcm_dp50/Conga1.wav",
  "A": "./audio/technics_pcm_dp50/Conga2.wav",
  "S": "./audio/technics_pcm_dp50/Ride.wav",
  "D": "./audio/technics_pcm_dp50/Snare.wav",
  "Z": "./audio/technics_pcm_dp50/Tom2.wav",
  "X": "./audio/technics_pcm_dp50/Tom3.wav",
  "C": "./audio/technics_pcm_dp50/Tom4.wav"
}

const allowedKeys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

const AppWrapper = styled.div`
  background-color: #ddd;
  width: 600px;
  height: 300px;
  border: 5px solid #ffa500;
  display: flex;
  flex-direction: row;

  @media (max-width: 650px) {
    width: 300px;
    height: 600px;
    flex-direction: column;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#666',
    },
  },
});

function App() {
  const [powerIsOn, setPowerIsOn] = useState(false);
  const powerIsOnRef = useRef(powerIsOn);
  powerIsOnRef.current = powerIsOn;

  const [bankBSelected, setBankBSelected] = useState(false);
  const bankBSelectedRef = useRef(bankBSelected);
  bankBSelectedRef.current = bankBSelected;

  const [volume, setVolume] = useState(100);
  const volumeRef = useRef(volume);
  volumeRef.current = volume;

  const [textToDisplay, setTextToDisplay] = useState('please switch on!')

  const [clickedKeys, setClickedKeys] = useState({});
  const clickedKeysRef = useRef(clickedKeys);
  clickedKeysRef.current = clickedKeys;

  const playAudioForKey = key => {
    const audioEl = document.getElementById(key);
    audioEl.volume = volumeRef.current/100;
    audioEl.currentTime = 0;
    audioEl.play();

    const fileNameRegEx = /[^/]*.wav/;
    const fileName = audioEl.src.match(fileNameRegEx)[0];
    setTextToDisplay(fileName);
  }
  
  const addKeyToClickedKeys = (key, pressedBy) => {
    if (!powerIsOnRef.current) return;
    const newClickedKeys = { ...clickedKeysRef.current, [key]: pressedBy };
    setClickedKeys(newClickedKeys);
    playAudioForKey(key);
  };
  
  const RemoveKeyFromClickedKeys = key => {
    const newClickedKeys = { ...clickedKeysRef.current };
    delete newClickedKeys[key];
    setClickedKeys(newClickedKeys);
  };


  useEffect(() => {
    const onKeyDownHandler = event => {
      const key = event.key.toUpperCase();
      if (!clickedKeysRef.current.hasOwnProperty(key) && allowedKeys.includes(key)) {
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
      const key = event.target.innerText ? event.target.innerText.toUpperCase() : '';
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

  const onChangePowerHandler = (event) => {
    setPowerIsOn(event.target.checked)
    setTextToDisplay(event.target.checked ? '' : 'please switch on!');
  }

  const onChangeBankHandler = (event) => {
    setBankBSelected(event.target.checked);
    setTextToDisplay(event.target.checked ? 'Technics' : 'Korg');
  }

  const onChangeVolume = (event, newValue) => {
    setVolume(newValue);
    setTextToDisplay(`Volume: ${newValue}`);
  }

  const activeBank = bankBSelected ? bankB : bankA;

  return (
    <AppWrapper id="drum-machine">
      <MuiThemeProvider theme={theme}>
        <PadsWrapper clickedKeys={clickedKeys} powerIsOn={powerIsOn} activeBank={activeBank}/>
        <MenuWrapper 
          powerIsOn={powerIsOn}
          onChangePower={onChangePowerHandler}
          textToDisplay={textToDisplay}
          volume={volume}
          onChangeVolume={onChangeVolume}
          bankBSelected={bankBSelected}
          onChangeBank={onChangeBankHandler}
        />
      </MuiThemeProvider>
    </AppWrapper>
  );
}

export default App;
