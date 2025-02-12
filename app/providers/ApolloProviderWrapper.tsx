'use client';

import { ApolloProvider } from '@apollo/client';

import { apolloclient } from '../dashboard/graphQL/graphQLClient';

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={apolloclient}>{children}</ApolloProvider>;
}
