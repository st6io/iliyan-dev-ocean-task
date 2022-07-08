import { ReactNode } from 'react';

import styled, { SystemProps, x } from '@xstyled/styled-components';

interface Props extends SystemProps {
  title: string;
  children?: ReactNode;
}

const Title = styled(x.div)`
  font-size: 2xl;
  color: text.primary;
  margin-bottom: 8;
  text-transform: capitalize;
`;

const Text = styled(x.div)`
  word-break: break-all;
  color: text.secondary;
`;

const Section = ({ title, children, ...otherProps }: Props) => (
  <x.section {...otherProps}>
    <Title>{title}</Title>

    {children}
  </x.section>
);

Section.Text = Text;

export default Section;
