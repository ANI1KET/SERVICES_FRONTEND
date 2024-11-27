"use client";

import Link from "next/link";

import { useAppSelector } from "@/app/store/hooks/hooks";
import useBreakpoint from "@/app/lib/utils/useBreakpoint";

const ListNavigation = () => {
  const activeListTab = useAppSelector(
    (state) => state.tabs.activeTabs.ListCategoryTab
  );
  const { isMobile } = useBreakpoint();

  return isMobile ? (
    <Link
      href={`/list/${activeListTab}`}
      className="fixed top-0 right-0 m-1 p-1 rounded-3xl bg-black text-white shadow-md"
    >
      List Property
    </Link>
  ) : null;
};

export default ListNavigation;
