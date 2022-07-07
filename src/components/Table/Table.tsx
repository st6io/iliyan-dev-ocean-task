import styled, { SystemProps, x } from '@xstyled/styled-components';

interface Props extends SystemProps {
  rows: RowType[];
  headers?: string[];
  variant?: VariantType;
}

export enum Variant {
  Primary = 'primary',
  Secondary = 'secondary',
}
export type VariantType = `${Variant}`;

type RowType = {
  id: string;
  cells: string[];
};

const backgroundByVariant = {
  [Variant.Primary]: 'white',
  [Variant.Secondary]: 'light-grey',
};

const Cell = styled(x.td)`
  text-align: start;
  padding: 5;
`;

const StyledTable = styled(x.table)`
  // xstyled doesn't support utility prop "borderSpacing"
  border-spacing: 0 0.4rem;
`;

const Table = ({ rows, headers = [], variant = Variant.Primary, ...otherProps }: Props) => (
  <StyledTable {...otherProps}>
    {headers.length ? (
      <x.thead position="sticky" top={0}>
        <x.tr bg={backgroundByVariant[variant]}>
          {headers.map((header) => (
            <Cell as="th" key={header} textTransform="uppercase" color="primary">
              {header}
            </Cell>
          ))}
        </x.tr>
      </x.thead>
    ) : null}

    <x.tbody>
      {rows.map(({ id, cells }) => (
        <x.tr key={id} bg={backgroundByVariant[variant]}>
          {cells.map((cell) => (
            <Cell key={cell} color={`text.${variant}`}>
              {cell}
            </Cell>
          ))}
        </x.tr>
      ))}
    </x.tbody>
  </StyledTable>
);

export default Table;
