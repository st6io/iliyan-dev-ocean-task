import { BrowserRouter } from 'react-router-dom';

import { Preflight, ThemeProvider } from '@xstyled/styled-components';

import ApolloProvider from './ApolloProvider';
import Router from './pages/Router';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <Preflight />

    <ApolloProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
