import { x } from '@xstyled/styled-components';

import HomeLogoLink from './HomeLogoLink';

const Header = () => (
  <x.header
    bg="white"
    display="flex"
    justifyContent="center"
    alignItems="center"
    py={5}
    boxShadow="0px 0px 10px 2px #EEEEEF"
  >
    <HomeLogoLink />
  </x.header>
);

export default Header;
