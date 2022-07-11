import { useMemo } from 'react';
import PlaceholderLoading from 'react-placeholder-loading';

import styled, { SystemProps, x } from '@xstyled/styled-components';

interface Props extends SystemProps {
  rows: RowType[];
  headers?: string[];
  variant?: VariantType;
  onRowClick?: (row: RowType) => void;
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

const rowSpace = '0.4rem';

const StyledTable = styled(x.table)`
  // xstyled doesn't support utility prop "borderSpacing"
  border-spacing: 0 ${rowSpace};
`;

const Table = ({
  rows,
  onRowClick,
  headers = [],
  variant = Variant.Primary,
  ...otherProps
}: Props) => (
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
      {rows.map((row) => (
        <x.tr
          key={row.id}
          bg={{ _: backgroundByVariant[variant], hover: onRowClick ? 'light-grey' : null }}
          cursor={onRowClick ? 'pointer' : 'auto'}
          onClick={() => onRowClick?.(row)}
        >
          {row.cells.map((cell) => (
            <Cell key={cell} color={`text.${variant}`}>
              {cell}
            </Cell>
          ))}
        </x.tr>
      ))}
    </x.tbody>
  </StyledTable>
);

interface LoadingPlaceholderProps {
  rowsCount: number;
}

export const LoadingPlaceholder = ({ rowsCount }: LoadingPlaceholderProps) => {
  const keys = useMemo(() => new Array(rowsCount).fill(null).map((_, index) => index), [rowsCount]);

  return (
    <>
      {keys.map((key) => (
        <x.div key={key} mt={{ _: rowSpace, first: 0 }}>
          <PlaceholderLoading shape="rect" colorStart="white" width="100%" height={60} />
        </x.div>
      ))}
    </>
  );
};

Table.LoadingPlaceholder = LoadingPlaceholder;

export default Table;
