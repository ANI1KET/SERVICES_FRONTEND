// 'use client';

// import { ApolloProvider } from '@apollo/client';

// import { apolloclient } from '../dashboard/graphQL/graphQLClient';

// export default function ApolloProviderWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <ApolloProvider client={apolloclient}>{children}</ApolloProvider>;
// }

'use client';

import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { useState, useEffect } from 'react';

import createApolloClient from '../dashboard/graphQL/graphQLClient';

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    const setupApollo = async () => {
      const apolloClient = await createApolloClient();
      setClient(apolloClient);
    };

    setupApollo();
  }, []);

  if (!client) return <p>Loading...</p>;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
