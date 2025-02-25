'use client';

import { getSession } from 'next-auth/react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = async () => {
  const session = await getSession();
  const { role, permission } = session?.user || {};

  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
      // credentials: 'include',
      headers:
        role && permission
          ? {
              'X-User-Role': String(role),
              'X-User-Permission': JSON.stringify(permission),
            }
          : undefined,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
