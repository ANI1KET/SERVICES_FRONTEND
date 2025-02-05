'use client';

import { cn } from '@/app/lib/utils/tailwindMerge';
import { categoryTabs } from '@/app/lib/utils/tabs';
import CategoryTabs from '@/app/lib/ui/CategoryTabs';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const UpperSearchBox = () => {
  const cachedTheme = useThemeState();

  return (
    <>
      <CategoryTabs
        tabs={categoryTabs}
        componentId={`CategoryTab`}
        className={`h-1/2 grid grid-flow-col place-items-center `}
      />
      <hr className={cn(cachedTheme?.borderColor)} />
    </>
  );
};

export default UpperSearchBox;
