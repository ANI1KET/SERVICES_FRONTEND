// import type { Metadata } from 'next';

import ApolloProviderWrapper from '../providers/ApolloProviderWrapper';
import LayoutComponent from './layoutComponent';

// export const metadata: Metadata = {
//   title: 'ROOM RENTAL',
//   description: 'TO RENT ROOM',
//   keywords: ['rent', 'room', 'accommodation'],
// };

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderWrapper>
      <LayoutComponent>{children}</LayoutComponent>
    </ApolloProviderWrapper>
  );
}
