import type { Metadata } from 'next';

import LayoutComponent from './layoutComponent';

export const metadata: Metadata = {
  title: 'SERVICES',
  description: 'TO RENT ROOM',
  keywords: ['rent', 'room', 'accommodation'],
};

export default function InterestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutComponent>{children}</LayoutComponent>;
}
