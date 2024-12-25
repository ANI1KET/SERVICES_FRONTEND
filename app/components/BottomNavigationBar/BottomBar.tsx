'use client';

import React, { useState, useCallback } from 'react';

import { BottomTabs } from '../../lib/utils/tabs';
import SearchPanel from './PanelComponent/SearchPanel';
import NavigationTabs from '../../lib/ui/NavigationTabs';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';
import { CrossIcon, SearchIcon } from '@/app/lib/icon/svg';

const BottomBar = () => {
  const { isMobile } = useBreakpoint();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  if (!isMobile) return null;
  return (
    <div className="">
      <div
        className={`fixed bottom-[7.8vh] left-0 right-0 flex flex-col items-center rounded-t-3xl bg-white transition-transform duration-300 ${
          isPanelOpen ? '' : 'hidden'
        }`}
      >
        <div className="h-[75vh] rounded-t-3xl w-full p-2 overflow-y-scroll border-2 border-b-0 border-black">
          <SearchPanel />
        </div>
        <div
          className="cursor-pointer rounded-full p-1 backdrop-blur-3xl border-2 border-black absolute bottom-[0.8vh] right-1 bg-white"
          onClick={togglePanel}
        >
          <CrossIcon />
        </div>
      </div>

      {!isPanelOpen && (
        <div
          className="fixed bottom-[8.5vh] right-1 cursor-pointer rounded-full p-1 border-2 border-black bg-white"
          onClick={togglePanel}
        >
          <SearchIcon />
        </div>
      )}

      <NavigationTabs
        componentId="BottomTab"
        tabs={BottomTabs}
        className={`flex items-center justify-around h-[8vh] fixed bottom-[-1px] w-full ${
          isPanelOpen ? 'rounded-t-none' : 'rounded-t-3xl'
        } border-2 border-black bg-white`}
      />
    </div>
  );
};

export default BottomBar;
