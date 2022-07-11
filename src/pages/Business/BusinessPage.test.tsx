import { Route, Routes } from 'react-router-dom';

import { DocumentNode, InMemoryCache } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { fireEvent, render, screen, waitFor } from '@src/utils/test';

import BusinessPage from './BusinessPage';

import mockBusinesses from '../businesses.mock.json';
import { BUSINESSES_QUERY, BUSINESS_FRAGMENT as MockBusinessFragment } from '../hooks';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useApolloClient: () => ({
    readFragment: ({ id, fragment }: { id?: string; fragment: DocumentNode }) => {
      if (fragment.toString() === MockBusinessFragment.toString()) {
        const entityId = id?.replace('Business:', '');
        return mockBusinesses.find((business) => business.id === entityId);
      }
    },
  }),
}));

jest.mock('react-placeholder-loading', () => (props: any) => (
  <div>
    <span>Placeholder:</span>
    {JSON.stringify(props, null, 2)}
  </div>
));

const nearbyPlacesRows = [
  {
    id: 'Kimia',
    cells: ['Kimia', '6 Tennyson, Manchester LS9'],
  },
  {
    id: 'Pixoboo',
    cells: ['Pixoboo', '7730 Sage, Manchester IV1'],
  },
  {
    id: 'Dabvine',
    cells: ['Dabvine', '34 Mcbride, Manchester OX7'],
  },
];

const successBusinessesQueryMock: MockedResponse = {
  request: {
    query: BUSINESSES_QUERY,
  },
  result: {
    data: {
      businesses: mockBusinesses,
    },
  },
};

const renderPage = (mock = successBusinessesQueryMock) =>
  render(
    <MockedProvider mocks={[mock]} cache={new InMemoryCache()}>
      <Routes>
        <Route path="businesses/:businessId" element={<BusinessPage />} />
      </Routes>
    </MockedProvider>,
    {
      path: `/businesses/${mockBusinesses[0].id}`,
    },
  );

const waitToLoadData = () => waitFor(() => screen.findByText('address'));

describe('BusinessPage', () => {
  it('should match snapshot', async () => {
    const { container } = renderPage();

    await waitToLoadData();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render image cover with correct styles', async () => {
    renderPage();

    await waitToLoadData();

    const [, coverImg] = screen.queryAllByRole('img');

    expect(coverImg).toBeInTheDocument();
    expect(coverImg).toHaveAttribute(
      'src',
      'https://images.unsplash.com/photo-1527015175922-36a306cf0e20?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&w=1000',
    );
    expect(coverImg).toHaveAttribute('alt', 'Zazio cover photo');
    expect(coverImg).toHaveStyle({
      width: '100%',
      height: '100%',
      'object-fit': 'cover',
    });
  });

  it('should apply correct spacing between section groups', async () => {
    renderPage();

    await waitToLoadData();

    const [, img] = screen.queryAllByRole('img');
    const contentElement = img.parentNode?.nextSibling;

    expect(contentElement).toHaveStyle({
      display: 'flex',
      'justify-content': 'space-between',
    });
  });

  describe('Address', () => {
    it('should apply correct styles to section "Address"', async () => {
      renderPage();

      await waitToLoadData();

      const addressTitle = screen.queryByText('address');
      expect(addressTitle).toBeInTheDocument();
      expect(addressTitle).toHaveStyle({
        'font-size': '1.5rem',
        color: 'rgb(53, 52, 73)',
        'margin-bottom': '2rem',
        'text-transform': 'capitalize',
      });

      const addressSection = addressTitle?.parentNode;
      expect(addressSection).toHaveStyle({
        'margin-right': '2.5rem',
      });
    });

    it('should render full address', async () => {
      renderPage();

      await waitToLoadData();

      expect(screen.getByText('84586 Straubel')).toBeInTheDocument();
      expect(screen.getByText('Manchester, United Kingdom SG4')).toBeInTheDocument();
    });
  });

  describe('Contact', () => {
    it('should apply correct styles to section "Contact"', async () => {
      renderPage();

      await waitToLoadData();

      const contactTitle = screen.queryByText('contact');
      expect(contactTitle).toBeInTheDocument();
      expect(contactTitle).toHaveStyle({
        'font-size': '1.5rem',
        color: 'rgb(53, 52, 73)',
        'margin-bottom': '2rem',
        'text-transform': 'capitalize',
      });
    });
  });

  describe('Nearby Places', () => {
    it('should render section group with background', async () => {
      renderPage();

      await waitToLoadData();

      const placesTitle = screen.queryByText('nearby places');
      const sectionGroup = placesTitle?.parentNode?.parentNode;
      expect(sectionGroup).toHaveStyle({
        'background-color': 'rgb(255, 255, 255)',
      });
    });

    it('should use table with "secondary" variant', async () => {
      renderPage();

      await waitToLoadData();

      const trElements = screen.queryByRole('table')?.querySelectorAll('tr') || [];
      expect(trElements.length).toBeGreaterThan(0);
      trElements.forEach((rowElement) => {
        expect(rowElement).toHaveStyle({
          'background-color': 'rgb(248, 248, 250)',
        });
      });

      nearbyPlacesRows
        .flatMap(({ cells }) => cells)
        .forEach((cell) => {
          const cellElement = screen.queryByText(cell);
          expect(cellElement).toBeInTheDocument();
          expect(cellElement).toHaveStyle({
            color: 'rgb(146, 146, 157)',
          });
        });
    });

    it('should navigate to nearby business page on Nearby Places row click', async () => {
      renderPage();

      await waitToLoadData();

      fireEvent.click(screen.getByText('Kimia'));

      // Kimia Contact section
      expect(screen.getByText('762-896-8094')).toBeInTheDocument();
      expect(screen.getByText('bfurmonger2@ask.com')).toBeInTheDocument();
    });
  });

  it('should render loading screen', () => {
    const { container } = renderPage();

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
