import { useEffect, useRef, useState } from 'react';

import { x } from '@xstyled/styled-components';
import { createGlobalStyle } from '@xstyled/styled-components';

import Layout from '@components/Layout';
import Table from '@components/Table';

import businessesData from './businesses.mock.json';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const headers = ['name', 'description'];
const rows = businessesData.map(({ id, name, description }) => ({
  id,
  cells: [name, description],
}));

const BusinessesPage = () => {
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

  return (
    <Layout>
      <GlobalStyle />

      <x.div ref={ref} h={height} overflow="auto">
        <Table variant="primary" headers={headers} rows={rows} w={1} />
      </x.div>
    </Layout>
  );
};

export default BusinessesPage;
