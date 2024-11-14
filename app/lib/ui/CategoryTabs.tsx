"use client";

import React, { useCallback } from "react";

import { setActiveTab } from "@/app/store/slices/tabSlice";
import {
  useAppDispatch,
  useAppSelector,
  useLazyGetRoomLocationsQuery,
} from "@/app/store/hooks/hooks";

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ children, isActive, onClick }) => {
  return (
    <li
      className={`cursor-pointer p-1 text-sm lg:text-base uppercase rounded-3xl transition-all duration-200 ${
        isActive ? `text-white bg-black scale-105 ` : ""
      }`}
      onClick={onClick}
    >
      <span>{children}</span>
    </li>
  );
};

interface TabsProps {
  componentId: string;
  tabs: [string, React.ReactNode][];
  className: string;
}

const CategoryTabs: React.FC<TabsProps> = ({
  componentId,
  tabs,
  className,
}) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state) => state.tabs.activeTabs[componentId]
  );
  const [triggerGetRoomLocations, { data, isLoading, error }] =
    useLazyGetRoomLocationsQuery();

  const handleTabClick = useCallback(
    (label: string) => {
      dispatch(setActiveTab({ componentId, activeTab: label }));
      triggerGetRoomLocations({ category: label });
    },
    [componentId, dispatch]
  );

  return (
    <ul className={`${className}`}>
      {tabs?.map(([label, content], index) => (
        <Tab
          key={index}
          isActive={activeTab === label}
          onClick={() => handleTabClick(label)}
        >
          {content}
        </Tab>
      ))}
    </ul>
  );
};

export default CategoryTabs;

// interface CategoryTabs {
//   isTriggered?: boolean;
// }
// const CategoryTabs: React.FC<CategoryTabsProps> = ({
//   isTriggered = false,
// }) => {
//   return (
//     </div>
//   );
// };

// const CategoryTabs: React.FC<{ isTriggered?: boolean }> = ({
//   isTriggered = false,
// }) => {
//   return (
//   );
// };

// export default CategoryTabs;
