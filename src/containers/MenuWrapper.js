import React from 'react';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

import Display from '../components/Display';

const StyledComponent = styled.div`
  width: 40%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 650px) {
    width: 100%;
    height: 50%;
  }
`;

const styles = {
    switch: {
        display: 'flex',
        justifyContent: 'center'
    }
}

const MenuWrapper = props => {
  return (
    <StyledComponent>
      <Grid style={styles.switch} component="label" container alignItems="center" spacing={1}>
        <Grid item>Off</Grid>
        <Grid item>
          <Switch
            checked={props.powerIsOn}
            onChange={props.onChangePower}
            color="default"
            name="checkedB"
          />
        </Grid>
        <Grid item>On</Grid>
      </Grid>

      <Display text={props.textToDisplay} />

      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider disabled={!props.powerIsOn} value={props.volume} onChange={props.onChangeVolume} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>

      <Grid style={styles.switch}  component="label" container alignItems="center" spacing={1}>
        <Grid item>Bank A</Grid>
        <Grid item>
          <Switch
            checked={props.bankBSelected}
            onChange={props.onChangeBank}
            color="default"
            name="checkedB"
            disabled={!props.powerIsOn}
          />
        </Grid>
        <Grid item>Bank B</Grid>
      </Grid>

    </StyledComponent>
  );
};

export default MenuWrapper;
