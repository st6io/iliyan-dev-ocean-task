import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { x } from '@xstyled/styled-components';
import { createGlobalStyle } from '@xstyled/styled-components';

import Error from '@components/Error';
import Layout from '@components/Layout';
import Table, { LoadingPlaceholder } from '@components/Table';

import { useBusinessesQuery } from '../hooks';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const headers = ['name', 'description'];

const StyledLayout = ({ children }: { children: ReactNode }) => (
  <Layout>
    <GlobalStyle />

    {children}
  </Layout>
);

const BusinessesPage = () => {
  const navigate = useNavigate();
  const onRowClick = useCallback(({ id }: { id: string }) => navigate(`./${id}`), [navigate]);

  const { loading, error, data } = useBusinessesQuery();
  const businessesRows = useMemo(
    () =>
      data?.businesses
        ? data.businesses.map(({ id, name, description }) => ({
            id,
            cells: [name, description],
          }))
        : [],
    [data],
  );

  const [height, setHeight] = useState('100vh');
  const ref = useRef<any>();

  useEffect(() => {
    const onResize = () => {
      if (ref.current) {
        setHeight(`${window.innerHeight - ref.current.offsetTop}px`);
      }
    };

    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (error) {
    return (
      <StyledLayout>
        <Error />
      </StyledLayout>
    );
  }

  return (
    <StyledLayout>
      <x.div ref={ref} h={height} overflow="auto">
        {loading ? (
          <LoadingPlaceholder rowsCount={20} />
        ) : (
          <Table
            variant="primary"
            headers={headers}
            rows={businessesRows}
            onRowClick={onRowClick}
            w={1}
          />
        )}
      </x.div>
    </StyledLayout>
  );
};

export default BusinessesPage;
