import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render as nativeRender } from '@testing-library/react';

const render = (ui: ReactElement, { path = '/', ...options } = {}) => {
  const RouterWrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
  );

  return nativeRender(ui, {
    wrapper: RouterWrapper,
    ...options,
  });
};

export * from '@testing-library/react';
export { render };
