import React from "react";
import SlideTabs from "./utils/tabNavigation";
import { NavBarTabs } from "./utils/tabs";

const Header: React.FC = () => {
  return (
    <div className="max-sm:hidden flex items-center h-[10vh] w-full fixed left-0 right-0 bg-green-500">
      <div className="w-2/6 bg-slate-700 ">AFNOSANSAR</div>
      <SlideTabs
        tabs={NavBarTabs}
        componentId="NavBar"
        className="h-[7vh] w-3/5 flex items-center justify-around bg-red-500 "
        sliderClass="h-[3.8vh] rounded-full bg-black"
      />
      <div className="w-2/6 bg-yellow-500 flex flex-row-reverse ">
        Other Content
      </div>
    </div>
  );
};

export default Header;
