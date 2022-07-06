import { Link } from 'react-router-dom';

import { x } from '@xstyled/styled-components';

import Logo from '@src/assets/logo.png';

const HomeLogoLink = () => (
  <Link to="/">
    <x.img src={Logo} alt="home logo" />
  </Link>
);

export default HomeLogoLink;
