import { BrowserRouter } from 'react-router-dom';

import { Preflight, ThemeProvider, defaultTheme } from '@xstyled/styled-components';

import Router from './Router';

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <Preflight />

    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
