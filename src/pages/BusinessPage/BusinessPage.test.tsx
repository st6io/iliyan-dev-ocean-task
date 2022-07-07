import { render, screen } from '@src/utils/test';

import BusinessPage from './BusinessPage';
import nearbyPlaces from './nearby-places.mock.json';

const nearbyPlacesRows = nearbyPlaces.map(({ name, address }, index) => ({
  id: `name`,
  cells: [name, address],
}));

const renderPage = () => render(<BusinessPage />);

describe('BusinessPage', () => {
  it('should match snapshot', () => {
    const { container } = renderPage();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render image cover with correct styles', () => {
    renderPage();

    const [, coverImg] = screen.queryAllByRole('img');

    expect(coverImg).toBeInTheDocument();
    expect(coverImg).toHaveAttribute(
      'src',
      'https://images.unsplash.com/photo-1527015175922-36a306cf0e20?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&w=1000',
    );
    expect(coverImg).toHaveAttribute('alt', 'Zazio cover photo');
    expect(coverImg).toHaveStyle({
      width: '100%',
      height: '40vh',
      'object-fit': 'cover',
    });
  });

  it('should apply correct spacing between section groups', () => {
    renderPage();

    const [, img] = screen.queryAllByRole('img');
    const contentElement = img.nextSibling;

    expect(contentElement).toHaveStyle({
      display: 'flex',
      'justify-content': 'space-between',
    });
  });

  describe('Address', () => {
    it('should apply correct styles to section "Address"', () => {
      renderPage();

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

    it('should render full address', () => {
      renderPage();

      expect(screen.getByText('84586 Straubel')).toBeInTheDocument();
      expect(screen.getByText('Manchester, United Kingdom SG4')).toBeInTheDocument();
    });
  });

  describe('Contact', () => {
    it('should apply correct styles to section "Contact"', () => {
      renderPage();

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
    it('should render section group with background', () => {
      renderPage();

      const placesTitle = screen.queryByText('nearby places');
      const sectionGroup = placesTitle?.parentNode?.parentNode;
      expect(sectionGroup).toHaveStyle({
        'background-color': 'rgb(255, 255, 255)',
      });
    });

    it('should use table with "secondary" variant', () => {
      renderPage();

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
  });
});
