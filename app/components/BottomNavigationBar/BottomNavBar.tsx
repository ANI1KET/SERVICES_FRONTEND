"use client";

import { BottomTabs } from "../../lib/utils/tabs";
import SlideTabs from "../../lib/utils/tabNavigation";

const BottomNavBar = () => {
  return (
    <SlideTabs
      componentId="BottomTab"
      tabs={BottomTabs}
      className="hidden max-sm:flex max-sm:items-center max-sm:justify-around max-sm:h-[8vh] max-sm:fixed max-sm:bottom-[-1px] max-sm:w-full max-sm:rounded-t-3xl backdrop-blur-3xl bg-green-500 "
      sliderClass="h-[6vh] rounded-full bg-black"
    />
  );
};

export default BottomNavBar;
