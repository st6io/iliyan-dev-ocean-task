import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@xstyled/styled-components';

import App from './App';
import theme from './theme';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: ReactNode }) => <div>BrowserRouter {children}</div>,
}));

jest.mock('@xstyled/styled-components', () => ({
  ...jest.requireActual('@xstyled/styled-components'),
  Preflight: () => <div>Preflight</div>,
  ThemeProvider: jest.fn(),
}));

jest.mock('./Router', () => () => <div>Router</div>);

describe('App', () => {
  it.each(['Preflight', 'BrowserRouter', 'Router'])(
    'should render "%s" component',
    (componentName) => {
      const { ThemeProvider: ActualThemeProvider } = jest.requireActual(
        '@xstyled/styled-components',
      );
      (ThemeProvider as jest.Mock).mockImplementationOnce(ActualThemeProvider);
      render(<App />);

      expect(screen.getByText(componentName)).toBeInTheDocument();
    },
  );

  it('should render ThemeProvider with default theme', () => {
    render(<App />);

    const [{ theme: actualTheme }] = (ThemeProvider as jest.Mock).mock.calls[0];

    expect(actualTheme).toEqual(theme);
  });
});
