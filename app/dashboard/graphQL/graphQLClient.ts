// import { ApolloClient, InMemoryCache } from '@apollo/client';

// export const apolloclient = new ApolloClient({
//   credentials: 'include',
//   cache: new InMemoryCache(),
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_BASE_URL,
// });

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const apolloclient = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_BASE_URL,
    credentials: 'include',
  }),
});
