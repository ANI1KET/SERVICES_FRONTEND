'use client';

import SearchForm from '@/app/lib/ui/SearchForm';
import { categoryTabs } from '@/app/lib/utils/tabs';
import CategoryTabs from '@/app/lib/ui/CategoryTabs';

const SearchPanel = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <CategoryTabs
        tabs={categoryTabs}
        componentId={`CategoryTab`}
        className={`h-[16vh] grid grid-cols-3 place-items-center `}
      />

      <SearchForm />
    </div>
  );
};

export default SearchPanel;
