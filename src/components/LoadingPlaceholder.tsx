import { useMemo } from 'react';
import PlaceholderLoading from 'react-placeholder-loading';

import { x } from '@xstyled/styled-components';

interface Props {
  rows: number;
}

// TODO: move this in Table, so 0.4rem lives in one place only
const LoadingPlaceholder = ({ rows }: Props) => {
  const keys = useMemo(() => new Array(rows).fill(null).map((_, index) => index), [rows]);

  return (
    <>
      {keys.map((key) => (
        <x.div mt={{ _: '0.4rem', first: 0 }}>
          <PlaceholderLoading key={key} shape="rect" colorStart="white" width="100%" height={60} />
        </x.div>
      ))}
    </>
  );
};

export default LoadingPlaceholder;
