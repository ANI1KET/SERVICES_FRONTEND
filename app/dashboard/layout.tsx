// import type { Metadata } from 'next';

import LayoutComponent from '../components/DashBoard/layoutComponent';
import ApolloProviderWrapper from '../providers/ApolloProviderWrapper';

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
