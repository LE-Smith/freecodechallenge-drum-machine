import styled from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import PadsWrapper from './containers/PadsWrapper';
import MenuWrapper from './containers/MenuWrapper';

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
  return (
    <AppWrapper>
      <MuiThemeProvider theme={theme}>
        <PadsWrapper />
        <MenuWrapper />
      </MuiThemeProvider>
    </AppWrapper>
  );
}

export default App;
