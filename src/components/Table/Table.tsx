import styled, { SystemProps, x } from '@xstyled/styled-components';

interface Props extends SystemProps {
  rows: RowType[];
  headers?: string[];
}

type RowType = {
  id: string;
  cells: string[];
};

const Row = styled(x.tr)`
  background-color: white;
`;

const Cell = styled(x.td)`
  text-align: start;
  padding: 5;
`;

const StyledTable = styled(x.table)`
  // xstyled doesn't support utility prop "borderSpacing"
  border-spacing: 0 0.4rem;
`;

const Table = ({ rows, headers = [], ...otherProps }: Props) => (
  <StyledTable {...otherProps}>
    {headers.length ? (
      <x.thead position="sticky" top={0}>
        <Row>
          {headers.map((header) => (
            <Cell as="th" key={header} textTransform="uppercase" color="primary">
              {header}
            </Cell>
          ))}
        </Row>
      </x.thead>
    ) : null}

    <x.tbody>
      {rows.map(({ id, cells }) => (
        <Row key={id}>
          {cells.map((cell) => (
            <Cell key={cell} color="text">
              {cell}
            </Cell>
          ))}
        </Row>
      ))}
    </x.tbody>
  </StyledTable>
);

export default Table;
