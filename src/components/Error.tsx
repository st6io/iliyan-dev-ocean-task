import { SystemProps } from '@xstyled/styled-components';

import Section from './Section';

const Error = (props: SystemProps) => (
  <Section title="Oops!" flex={1} textAlign="center" {...props}>
    <Section.Text>Something went wrong.</Section.Text>
    <Section.Text>Please try again later.</Section.Text>
  </Section>
);

export default Error;
