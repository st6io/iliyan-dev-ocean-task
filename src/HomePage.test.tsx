import { render, screen } from '@testing-library/react';

import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders "Home Page" text', () => {
    render(<HomePage />);

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
