"use client";

import React, { memo } from "react";

import SearchForm from "@/app/lib/ui/SearchForm";
import { SearchBoxTabs } from "@/app/lib/utils/tabs";
import CategoryTabs from "@/app/lib/ui/CategoryTabs";

const SearchPanel = memo(() => {
  return (
    <div className="flex flex-col gap-2">
      <CategoryTabs
        tabs={SearchBoxTabs}
        componentId={`SearchTab`}
        className={`h-[16vh] grid grid-cols-3 place-items-center `}
      />

      <SearchForm />
    </div>
  );
});

export default SearchPanel;
