import Router from './Router';
import { render, screen } from './utils/test';

describe('Router', () => {
  it.each([
    {
      path: '/',
      expectedText: 'Home Page',
    },
    {
      path: '/business',
      expectedText: 'Business Page',
    },
    {
      path: '/businesses',
      expectedText: 'Businesses Page',
    },
  ])('should open "$expectedText"', ({ path, expectedText }) => {
    render(<Router />, { path });

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
