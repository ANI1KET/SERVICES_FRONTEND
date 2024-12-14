'use client';

import Link from 'next/link';

import useBreakpoint from '@/app/lib/utils/useBreakpoint';
import { useTabState } from '@/app/providers/reactqueryProvider';

const ListNavigation = () => {
  const { isMobile } = useBreakpoint();
  const tabState = useTabState();

  if (!isMobile) {
    return null;
  }
  return (
    <Link
      href={`/list/${tabState?.ListCategoryTab}`}
      className="hidden max-sm:block fixed top-0 right-0 m-1 p-1 rounded-3xl bg-black text-white shadow-md"
    >
      List Property
    </Link>
  );
};

export default ListNavigation;
