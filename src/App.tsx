import { Preflight, ThemeProvider, defaultTheme, x } from '@xstyled/styled-components';

import logo from './logo.png';
import './App.css';

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <Preflight />

    <div className="App">
      <header className="App-header">
        <x.img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <x.a
          mt={3}
          bg="yellow"
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </x.a>
      </header>
    </div>
  </ThemeProvider>
);

export default App;
