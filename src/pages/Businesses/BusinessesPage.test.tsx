import { Route, Routes, useParams } from 'react-router-dom';

import { InMemoryCache } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { fireEvent, render, screen, waitFor } from '@src/utils/test';

import BusinessesPage from './BusinessesPage';

import businessesMock from '../businesses.mock.json';
import { BUSINESSES_QUERY } from '../hooks';

jest.mock('react-placeholder-loading', () => (props: any) => (
  <div>
    <span>TablePlaceholder:</span>
    {JSON.stringify(props, null, 2)}
  </div>
));

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

const waitToLoadData = () => waitFor(() => screen.findByText(businessesMock[0].name));

describe('BusinessesPage', () => {
  it('should match snapshot', async () => {
    const { container } = renderPage();

    await waitToLoadData();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should navigate to business page', async () => {
    renderPage();

    const [businessToClickOn] = businessesMock;

    await waitToLoadData();

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
      height: `${window.innerHeight}px`,
    });

    window.innerHeight = initialWindowHeight + heightChange;
    fireEvent.resize(window);

    expect(queryTableContainer()).toHaveStyle({
      height: `${initialWindowHeight + heightChange}px`,
    });
  });

  it('should render loading screen', () => {
    const { container } = renderPage();

    expect(screen.queryAllByText('TablePlaceholder:').length).toEqual(20);
    expect(container.firstChild).toMatchSnapshot();
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

    await screen.findByText('Something went wrong.');
    await screen.findByText('Please try again later.');
  });
});
