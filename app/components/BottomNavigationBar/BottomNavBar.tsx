"use client";

import { useState } from "react";

import SearchPanel from "./PanelComponent/panel";
import { BottomTabs } from "../../lib/utils/tabs";
import NavigationTabs from "../../lib/ui/NavigationTabs";

const BottomNavBar = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="hidden max-sm:flex">
      {isPanelOpen && (
        <div className="fixed bottom-[7.9vh] left-0 right-0 flex flex-col items-center bg-white ">
          <div className="h-[70vh] rounded-t-3xl w-full p-2 overflow-y-scroll border-2 border-b-0 border-black ">
            <SearchPanel />
          </div>

          <div
            className="cursor-pointer rounded-full p-[0.3rem] backdrop-blur-3xl border-2 border-black absolute bottom-[0.8vh] right-1 bg-white "
            onClick={() => setIsPanelOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentcolor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </div>
      )}

      {!isPanelOpen && (
        <div
          className="fixed bottom-[8.5vh] right-1 z-20 cursor-pointer rounded-full p-[0.3rem] border-2 border-black bg-white "
          onClick={() => setIsPanelOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      )}

      <NavigationTabs
        componentId="BottomTab"
        tabs={BottomTabs}
        className={`max-sm:flex max-sm:items-center max-sm:justify-around max-sm:h-[8vh] max-sm:fixed max-sm:bottom-[-1px] max-sm:w-full ${
          isPanelOpen ? "max-sm:rounded-t-none" : "max-sm:rounded-t-3xl"
        } border-2 border-black bg-white `}
      />
    </div>
  );
};

export default BottomNavBar;
