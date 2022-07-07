import { fireEvent, render, screen } from '@src/utils/test';

import BusinessesPage from './BusinessesPage';

const renderPage = () => ({
  ...render(<BusinessesPage />),
  queryTableContainer: () => screen.queryByRole('table')?.parentElement,
});

describe('BusinessesPage', () => {
  it('should match snapshot', () => {
    const { container } = renderPage();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should wrap table in scrollable container', () => {
    const { queryTableContainer } = renderPage();

    expect(queryTableContainer()).toBeInTheDocument();
    expect(queryTableContainer()).toHaveStyle({ overflow: 'auto' });
  });

  describe('table container dynamic height', () => {
    it('should init with 100vh', () => {
      const { queryTableContainer } = renderPage();

      expect(queryTableContainer()).toHaveStyle({
        height: `${window.innerHeight}px`,
      });
    });

    it('should update height on window resize', () => {
      const { queryTableContainer } = renderPage();
      const initialWindowHeight = window.innerHeight;
      const heightChange = -168;

      expect(queryTableContainer()).toHaveStyle({
        height: `${initialWindowHeight}px`,
      });

      window.innerHeight = initialWindowHeight + heightChange;
      fireEvent.resize(window);

      expect(queryTableContainer()).toHaveStyle({
        height: `${initialWindowHeight + heightChange}px`,
      });
    });
  });
});
