import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { businessesPath } from '@src/pages/Router';

import Section from '@components/Section';
import Table, { LoadingPlaceholder as TablePlaceholder } from '@components/Table';

import { useBusinessesQuery } from '../hooks';

interface Props {
  business: Business | null;
  loading?: boolean;
}

const getNearbyBusinesses = (
  { id: businessId, address: { city } }: Business,
  businesses: Business[],
) => businesses?.filter(({ id, address }) => id !== businessId && address.city === city);

const toNearbyPlaceRow = ({ id, name, address }: Business) => {
  const { number, street, city, zip } = address;
  const fullAddress = `${number} ${street}, ${city} ${zip}`;

  return {
    id,
    cells: [name, fullAddress],
  };
};

const NearbyPlaces = ({ business, loading }: Props) => {
  const navigate = useNavigate();
  const onRowClick = useCallback(
    ({ id }: { id: string }) => navigate(`../${businessesPath}/${id}`),
    [navigate],
  );

  const { loading: businessesLoading, data } = useBusinessesQuery();

  const nearbyPlacesRows = useMemo(
    () =>
      data?.businesses && business
        ? getNearbyBusinesses(business, data.businesses).map(toNearbyPlaceRow)
        : [],
    [business, data],
  );

  if (loading || businessesLoading) {
    return <TablePlaceholder rowsCount={4} />;
  }

  return (
    <Section title="nearby places" flex={1}>
      <Table variant="secondary" rows={nearbyPlacesRows} onRowClick={onRowClick} w={1} />
    </Section>
  );
};

export default NearbyPlaces;
