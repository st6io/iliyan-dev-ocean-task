import { Props, x } from '@xstyled/styled-components';

import Layout from '@components/Layout';
import Table from '@components/Table';

import Section from './Section';
import nearbyPlaces from './nearby-places.mock.json';

import businessesData from '../businesses.mock.json';

const { name, image, address, phone, email } = businessesData[0];
const { number, street, city, zip, country } = address;

const nearbyPlacesRows = nearbyPlaces.map(({ name, address }) => ({
  id: name,
  cells: [name, address],
}));

const SectionGroup = (props: Props) => <x.div display="flex" py={8} px={7} {...props} />;

const BusinessPage = () => (
  <Layout>
    <x.img src={image} alt={`${name} cover photo`} w={1} h="40vh" objectFit="cover"></x.img>

    <x.div display="flex" justifyContent="space-between" my={8} mx={12}>
      <SectionGroup justifyContent="space-around" flex={4} mr={5}>
        <Section title="address" mr={10}>
          <Section.Text>{`${number} ${street}`}</Section.Text>

          <Section.Text>{`${city}, ${country} ${zip}`}</Section.Text>
        </Section>

        <Section title="contact">
          <Section.Text>{phone}</Section.Text>

          <Section.Text>{email}</Section.Text>
        </Section>
      </SectionGroup>

      <SectionGroup bg="white" flex={5}>
        <Section title="nearby places" flex={1}>
          <Table variant="secondary" rows={nearbyPlacesRows} w={1} />
        </Section>
      </SectionGroup>
    </x.div>
  </Layout>
);

export default BusinessPage;
