import type { Metadata } from 'next';
import CategoryTabs from '../lib/ui/CategoryTabs';
import { categoryTabs } from '../lib/utils/tabs';

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
