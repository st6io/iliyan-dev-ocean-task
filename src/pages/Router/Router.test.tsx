import { render, screen } from '@src/utils/test';

import Router from './Router';

describe('Router', () => {
  it.each([
    {
      path: '/',
      expectedText: 'Businesses Page',
    },
    {
      path: '/non-existing-path',
      expectedText: 'Businesses Page',
    },
    {
      path: '/business',
      expectedText: 'Business Page',
    },
    {
      path: '/businesses',
      expectedText: 'Businesses Page',
    },
  ])('should open "$expectedText" when path "$path"', ({ path, expectedText }) => {
    render(<Router />, { path });

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});