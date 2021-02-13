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
  /* background-color: green; */
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
            // checked={state.checkedB}
            // onChange={handleChange}
            color="default"
            name="checkedB"
          />
        </Grid>
        <Grid item>On</Grid>
      </Grid>

      <Display text="Test Text" />

      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider aria-labelledby="continuous-slider" />
          {/* <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" /> */}

        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>

      <Grid style={styles.switch}  component="label" container alignItems="center" spacing={1}>
        <Grid item>Korg</Grid>
        <Grid item>
          <Switch
            // checked={state.checkedB}
            // onChange={handleChange}
            color="default"
            name="checkedB"
          />
        </Grid>
        <Grid item>Technics</Grid>
      </Grid>

    </StyledComponent>
  );
};

export default MenuWrapper;
