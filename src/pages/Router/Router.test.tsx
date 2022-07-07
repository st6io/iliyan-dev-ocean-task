import { render, screen } from '@src/utils/test';

import Router from './Router';

describe('Router', () => {
  it.each([
    {
      path: '/',
      expectedText: 'description',
    },
    {
      path: '/non-existing-path',
      expectedText: 'description',
    },
    {
      path: '/business',
      expectedText: 'address',
    },
    {
      path: '/businesses',
      expectedText: 'description',
    },
  ])('should open "$expectedText" when path "$path"', ({ path, expectedText }) => {
    render(<Router />, { path });

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
