import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloclient = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
});
