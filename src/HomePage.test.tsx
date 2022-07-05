import { render, screen } from '@testing-library/react';

import HomePage from './HomePage';

test('renders learn react link', () => {
  render(<HomePage />);

  const headerElement = screen.queryByText('Dummy Page');

  expect(headerElement).toBeInTheDocument();
});
