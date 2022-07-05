import { x } from '@xstyled/styled-components';

import logo from './logo.png';

const HomePage = () => (
  <x.header
    bg="#282c34"
    h="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <x.img src={logo} alt="business dir logo" />

    <x.div mt={3} bg="salmon">
      Dummy Page
    </x.div>
  </x.header>
);

export default HomePage;
