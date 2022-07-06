import { BrowserRouter } from 'react-router-dom';

import { Preflight, ThemeProvider } from '@xstyled/styled-components';

import Router from './Router';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <Preflight />

    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
