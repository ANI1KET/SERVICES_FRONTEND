'use client';

import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
