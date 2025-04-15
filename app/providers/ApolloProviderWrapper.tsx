// 'use client';

// import {
//   HttpLink,
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   NormalizedCacheObject,
// } from '@apollo/client';
// import { useRef } from 'react';
// import { Session } from 'next-auth';
// import { useSession } from 'next-auth/react';
// import { setContext } from '@apollo/client/link/context';

// export default function ApolloProviderWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { data: session } = useSession();
//   const clientRef = useRef<ApolloClient<NormalizedCacheObject> | null>(null);

//   if (!session) {
//     clientRef.current = null;
//   } else if (!clientRef.current) {
//     clientRef.current = createApolloClient(session);
//   }
//   // if (!session && clientRef.current) {
//   //   clientRef.current = null;
//   // } else if (session && !clientRef.current) {
//   //   clientRef.current = createApolloClient(session);
//   // }

//   if (!clientRef.current)
//     return (
//       <div className="w-full h-screen flex justify-center items-center">
//         Login to Access Again
//       </div>
//     );

//   return <ApolloProvider client={clientRef.current}>{children}</ApolloProvider>;
// }

// function createApolloClient(session: Session) {
//   const httpLink = new HttpLink({
//     uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
//   });

//   const authLink = setContext((_, { headers }) => {
//     const role = session?.user?.role;
//     const permission = session?.user?.permission;
//     return {
//       headers: {
//         ...headers,
//         ...(role && permission
//           ? {
//               'X-User-Role': String(role),
//               'X-User-Permission': JSON.stringify(permission),
//             }
//           : {}),
//       },
//     };
//   });

//   return new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
//   });
// }

'use client';

import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
      credentials: 'include',
    }),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
