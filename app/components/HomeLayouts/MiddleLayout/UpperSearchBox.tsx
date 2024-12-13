import CategoryTabs from '@/app/lib/ui/CategoryTabs';
import { categoryTabs } from '@/app/lib/utils/tabs';

const UpperSearchBox = () => {
  return (
    <CategoryTabs
      tabs={categoryTabs}
      componentId={`CategoryTab`}
      className={`h-1/2 grid grid-flow-col place-items-center`}
    />
  );
};

export default UpperSearchBox;
