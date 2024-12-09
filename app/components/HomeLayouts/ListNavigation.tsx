"use client";

import Link from "next/link";

import { useAppSelector } from "@/app/store/hooks/hooks";

const ListNavigation = () => {
  const activeListTab = useAppSelector(
    (state) => state.tabs.activeTabs.ListCategoryTab
  );

  return (
    <Link
      href={`/list/${activeListTab}`}
      className="hidden max-sm:block fixed top-0 right-0 m-1 p-1 rounded-3xl bg-black text-white shadow-md"
    >
      List Property
    </Link>
  );
};

export default ListNavigation;
