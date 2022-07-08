import { render, screen } from '@src/utils/test';

import Router from './Router';

jest.mock('../Businesses', () => () => <div>Businesses Page</div>);
jest.mock('../Business', () => () => <div>Business Page</div>);

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
      path: '/businesses/some-business-id',
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
