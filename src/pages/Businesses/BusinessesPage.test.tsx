import { Route, Routes, useParams } from 'react-router-dom';

import { InMemoryCache } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { fireEvent, render, screen, waitFor } from '@src/utils/test';

import BusinessesPage from './BusinessesPage';

import businessesMock from '../businesses.mock.json';
import { BUSINESSES_QUERY } from '../hooks';

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

const DummyBusinessPage = () => {
  const { businessId } = useParams();

  return <div>Business Page: {businessId}</div>;
};

const renderPage = (mock = successQueryMock) => ({
  ...render(
    <MockedProvider mocks={[mock]} cache={new InMemoryCache()}>
      <Routes>
        <Route path="businesses" element={<BusinessesPage />} />
        <Route path="businesses/:businessId" element={<DummyBusinessPage />} />
      </Routes>
    </MockedProvider>,
    {
      path: '/businesses',
    },
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

  it.only('should navigate to business page', async () => {
    renderPage();

    await waitToLoadData();

    const [businessToClickOn] = businessesMock;

    fireEvent.click(screen.getByText(businessToClickOn.name));

    expect(screen.getByText(`Business Page: ${businessToClickOn.id}`)).toBeInTheDocument();
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

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Please try again later.')).toBeInTheDocument();
  });
});
