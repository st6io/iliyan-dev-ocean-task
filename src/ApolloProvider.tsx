import { ReactNode } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as NativeApolloProvider,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

interface Props {
  children: ReactNode;
}

const apiUrl = 'https://feinterviewtask.azurewebsites.net/';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new RestLink({ uri: apiUrl }),
});

const ApolloProvider = ({ children }: Props) => (
  <NativeApolloProvider client={client}>{children}</NativeApolloProvider>
);

export default ApolloProvider;
