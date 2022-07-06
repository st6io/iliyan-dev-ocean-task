import { ReactNode } from 'react';

import { x } from '@xstyled/styled-components';

import Header from './Header';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <x.div display="flex" flexDirection="column" flex={1} minHeight="100vh" bg="light-grey">
    <Header />

    <x.div mx={14} mt={12}>
      {children}
    </x.div>
  </x.div>
);

export default Layout;
