import Layout from '@components/Layout';
import Section from '@components/Section';

const NotFountPage = () => (
  <Layout>
    <Section title="404" flex={1} textAlign="center">
      <Section.Text>Oops, page not found</Section.Text>
    </Section>
  </Layout>
);

export default NotFountPage;
