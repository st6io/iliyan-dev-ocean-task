import { render } from '@src/utils/test';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('should match snapshot', () => {
    const { container } = render(<NotFoundPage />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
