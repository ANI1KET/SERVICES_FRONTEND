'use client';

import { BottomTabs } from '../../lib/utils/tabs';
import NavigationTabs from '../../lib/ui/NavigationTabs';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';

const BottomBar = () => {
  const { isMobile } = useBreakpoint();

  if (!isMobile) return null;
  return (
    <div className="">
      <NavigationTabs
        componentId="BottomTab"
        tabs={BottomTabs}
        className={`flex items-center justify-around h-[8vh] fixed bottom-[-1px] w-full border-2 border-black bg-white`}
      />
    </div>
  );
};

export default BottomBar;
