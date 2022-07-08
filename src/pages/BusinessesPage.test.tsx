import { InMemoryCache } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { fireEvent, render, screen, waitFor } from '@src/utils/test';

import BusinessesPage from './BusinessesPage';
import businessesMock from './businesses.mock.json';
import { BUSINESSES_QUERY } from './hooks';

const successQueryMock: MockedResponse = {
  request: {
    query: BUSINESSES_QUERY,
  },
  result: {
    data: {
      businesses: businessesMock,
    },
  },
};

const renderPage = (mock = successQueryMock) => ({
  ...render(
    <MockedProvider mocks={[mock]} cache={new InMemoryCache()}>
      <BusinessesPage />
    </MockedProvider>,
  ),

  queryTableContainer: () => screen.queryByRole('table')?.parentElement,
});

const waitToLoadData = () =>
  waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

describe('BusinessesPage', () => {
  it('should match snapshot', async () => {
    const { container } = renderPage();

    await waitToLoadData();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should wrap table in scrollable container', async () => {
    const { queryTableContainer } = renderPage();

    await waitToLoadData();

    expect(queryTableContainer()).toBeInTheDocument();
    expect(queryTableContainer()).toHaveStyle({ overflow: 'auto' });
  });

  it('should update table container height on window resize', async () => {
    const { queryTableContainer } = renderPage();
    const initialWindowHeight = window.innerHeight;
    const heightChange = -168;

    await waitToLoadData();

    expect(queryTableContainer()).toHaveStyle({
      height: '100vh',
    });

    window.innerHeight = initialWindowHeight + heightChange;
    fireEvent.resize(window);

    expect(queryTableContainer()).toHaveStyle({
      height: `${initialWindowHeight + heightChange}px`,
    });
  });

  it('should render loading screen', () => {
    renderPage();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error screen', async () => {
    const errorQueryMock = {
      request: {
        query: BUSINESSES_QUERY,
      },
      result: {
        data: undefined,
      },
      error: new Error('Something went wrong'),
    };
    renderPage(errorQueryMock);

    await waitToLoadData();

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
