import { Preflight, ThemeProvider, defaultTheme } from '@xstyled/styled-components';

import HomePage from './HomePage';

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <Preflight />

    <HomePage />
  </ThemeProvider>
);

export default App;
