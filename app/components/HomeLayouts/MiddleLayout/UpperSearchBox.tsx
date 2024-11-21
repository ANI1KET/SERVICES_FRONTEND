"use server";

import CategoryTabs from "@/app/lib/ui/CategoryTabs";
import { SearchBoxTabs } from "@/app/lib/utils/tabs";

const UpperSearchBox = async () => {
  return (
    <CategoryTabs
      tabs={SearchBoxTabs}
      componentId={`SearchTab`}
      className={`h-1/2 grid grid-flow-col place-items-center`}
    />
  );
};

export default UpperSearchBox;
