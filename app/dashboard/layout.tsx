// import type { Metadata } from 'next';

import ApolloProviderWrapper from '../providers/ApolloProviderWrapper';
import { SideNavBar } from '../components/SideNavigationBar/SideNavBar';

// export const metadata: Metadata = {
//   title: 'ROOM RENTAL',
//   description: 'TO RENT ROOM',
//   keywords: ['rent', 'room', 'accommodation'],
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderWrapper>
      <SideNavBar>{children}</SideNavBar>
    </ApolloProviderWrapper>
  );
}
