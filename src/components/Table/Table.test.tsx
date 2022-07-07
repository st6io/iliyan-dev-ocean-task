import { render, screen } from '@src/utils/test';

import Table from './Table';

const headers = ['name', 'description'];
const rows = new Array(5).fill(null).map((_, index) => ({
  id: `id-${index}`,
  cells: [`name ${index}`, `description ${index}`],
}));

const renderTable = (props = {}) => ({
  ...render(<Table headers={headers} rows={rows} {...props} />),
  queryThead: () => screen.queryByRole('table')?.querySelector('thead'),
  queryTbody: () => screen.queryByRole('table')?.querySelector('tbody'),
});

describe('Table', () => {
  it('should match snapshot', () => {
    const { container } = renderTable();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should respect otherProps', () => {
    renderTable({ w: 0.1234 });

    expect(screen.queryByRole('table')).toHaveStyle({
      width: '12.34%',
    });
  });

  it('should apply correct styles', () => {
    renderTable();

    expect(screen.queryByRole('table')).toHaveStyle({
      'border-spacing': '0 0.4rem',
    });
  });

  describe('head', () => {
    it('should have a sticky thead row', () => {
      const { queryThead } = renderTable();

      expect(queryThead()).toHaveStyle({
        position: 'sticky',
        top: 0,
      });
    });

    it('should render header cells with correct styles', () => {
      renderTable({ headers });

      headers.forEach((header) => {
        const headerCell = screen.queryByText(header);
        expect(headerCell).toBeInTheDocument();
        expect(headerCell).toHaveStyle({
          padding: '1.25rem',
          'text-align': 'start',
          color: '#b41d76',
          'text-transform': 'uppercase',
        });
      });
    });

    it('should NOT render thead row when no headers', () => {
      const { queryThead } = renderTable({ headers: undefined });

      expect(queryThead()).not.toBeInTheDocument();
    });
  });

  describe('body', () => {
    it('should render cells with correct styles', () => {
      renderTable({ rows });

      rows
        .flatMap(({ cells }) => cells)
        .forEach((cell) => {
          const cellElement = screen.queryByText(cell);
          expect(cellElement).toBeInTheDocument();
          expect(cellElement).toHaveStyle({
            padding: '1.25rem',
            'text-align': 'start',
            color: '#353449',
          });
        });
    });
  });

  describe('variants', () => {
    it.each([
      {
        testName: 'should apply "primary" variant styles by default',
        variant: undefined,
        expected: {
          bg: 'rgb(255, 255, 255)',
          color: 'rgb(53, 52, 73)',
        },
      },
      {
        testName: 'should apply "secondary" variant styles',
        variant: 'secondary',
        expected: {
          bg: 'rgb(248, 248, 250)',
          color: 'rgb(146, 146, 157)',
        },
      },
    ])('$testName', ({ variant, expected }) => {
      renderTable({ rows, variant });

      const trElements = screen.queryByRole('table')?.querySelectorAll('tr') || [];

      expect(trElements.length).toBeGreaterThan(0);
      trElements.forEach((rowElement) => {
        expect(rowElement).toHaveStyle({
          'background-color': expected.bg,
        });
      });

      rows
        .flatMap(({ cells }) => cells)
        .forEach((cell) => {
          const cellElement = screen.queryByText(cell);
          expect(cellElement).toBeInTheDocument();
          expect(cellElement).toHaveStyle({
            color: expected.color,
          });
        });
    });
  });
});
