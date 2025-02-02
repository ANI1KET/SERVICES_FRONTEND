import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SERVICES',
  description: 'TO RENT ROOM',
  keywords: ['rent', 'room', 'accommodation'],
};

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
