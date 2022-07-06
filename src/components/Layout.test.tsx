/* eslint-disable testing-library/no-container */
import Layout from './Layout';

import { render, screen } from '../utils/test';

const renderLayout = () => render(<Layout>Content</Layout>);

describe('Layout', () => {
  it('should render container with correct styles', () => {
    const { container } = renderLayout();

    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      'flex-direction': 'column',
      flex: 1,
      'min-height': '100vh',
      'background-color': '#f8f8fa',
    });
  });

  describe('header', () => {
    test('should render logo in header', () => {
      const { container } = renderLayout();

      const logo = container.querySelector('header img');

      expect(logo).toBeInTheDocument();
      expect(logo).toHaveProperty('src', `${window.location.origin}/logo.png`);
      expect(logo).toHaveProperty('alt', 'home logo');
    });

    test('should render logo that redirects to home', () => {
      const { container } = renderLayout();

      const anchorElement = container.querySelector('header img')?.parentElement;

      expect(anchorElement).toBeInTheDocument();
      expect(anchorElement).toHaveProperty('href', `${window.location.origin}/`);
    });

    test('should render header with correct styles', () => {
      const { container } = renderLayout();

      const header = container.querySelector('header');

      expect(header).toBeInTheDocument();
      expect(header).toHaveStyle({
        'background-color': 'rgb(255, 255, 255)',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'padding-bottom': '1.25rem',
        'padding-top': '1.25rem',
      });
    });
  });

  describe('content', () => {
    test('should render content', () => {
      renderLayout();

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('should render content with correct styles', () => {
      renderLayout();

      expect(screen.getByText('Content')).toHaveStyle({
        'margin-left': '3.5rem',
        'margin-right': '3.5rem',
        'margin-top': '3rem',
      });
    });
  });
});
