import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render as nativeRender } from '@testing-library/react';
import { ThemeProvider } from '@xstyled/styled-components';

import theme from '../theme';

const render = (ui: ReactElement, { path = '/', ...options } = {}) => {
  const Providers = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
    </ThemeProvider>
  );

  return nativeRender(ui, {
    wrapper: Providers,
    ...options,
  });
};

export * from '@testing-library/react';
export { render };
