import { useParams } from 'react-router-dom';

import { Props, x } from '@xstyled/styled-components';

import Error from '@components/Error';
import Layout from '@components/Layout';
import LoadingPlaceholder from '@components/LoadingPlaceholder';
import Section from '@components/Section';

import NearbyPlaces from './NearbyPlaces';

import { useBusinessQuery } from '../hooks';

const SectionGroup = (props: Props) => <x.div display="flex" py={8} px={7} {...props} />;

const BusinessPage = () => {
  const { businessId } = useParams();
  const { loading, error, data } = useBusinessQuery(businessId);

  const { name, image, address, phone, email } = data?.business || {};
  const { number, street, city, zip, country } = address || {};

  if (error) {
    return (
      <Layout>
        <Error />
      </Layout>
    );
  }

  return (
    <Layout>
      <x.div h="40vh">
        {loading ? (
          <LoadingPlaceholder />
        ) : (
          <x.img src={image} alt={`${name} cover photo`} w={1} h="100%" objectFit="cover"></x.img>
        )}
      </x.div>

      <x.div
        display="flex"
        flexDirection={{ _: 'column', lg: 'row' }}
        justifyContent="space-between"
        my={8}
        mx={{ _: 2, sm: 12 }}
      >
        <SectionGroup justifyContent="space-around" flex={4} mr={5}>
          {loading ? (
            <LoadingPlaceholder height="50%" />
          ) : (
            <>
              <Section title="address" mr={10}>
                <Section.Text>{`${number} ${street}`}</Section.Text>

                <Section.Text>{`${city}, ${country} ${zip}`}</Section.Text>
              </Section>

              <Section title="contact">
                <Section.Text>{phone}</Section.Text>

                <Section.Text>{email}</Section.Text>
              </Section>
            </>
          )}
        </SectionGroup>

        <SectionGroup bg="white" flex={5} flexDirection="column">
          <NearbyPlaces business={data.business} loading={loading} />
        </SectionGroup>
      </x.div>
    </Layout>
  );
};

export default BusinessPage;
