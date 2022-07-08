import { gql, useQuery } from '@apollo/client';

const BUSINESS_FRAGMENT = gql`
  fragment BusinessFragment on Business {
    id
    name
    description
    phone
    image
    email

    address {
      number
      street
      zip
      city
      country
    }
  }
`;

export const BUSINESSES_QUERY = gql`
  query Businesses {
    businesses @rest(type: "Business", path: "b/6231abada703bb67492d2b8f") {
      ...BusinessFragment
    }
  }
  ${BUSINESS_FRAGMENT}
`;

export const useBusinessesQuery = () => useQuery<{ businesses: Business[] }>(BUSINESSES_QUERY);
