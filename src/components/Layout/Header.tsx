import { Link } from 'react-router-dom';

import { x } from '@xstyled/styled-components';

import Logo from '../Logo';

const Header = () => (
  <x.header
    bg="white"
    display="flex"
    justifyContent="center"
    alignItems="center"
    py={5}
    boxShadow="0px 0px 10px 2px #EEEEEF"
  >
    <Link to="/">
      <Logo />
    </Link>
  </x.header>
);

export default Header;
