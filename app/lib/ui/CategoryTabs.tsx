'use client';

import React, { useCallback } from 'react';

import {
  useTabState,
  useThemeState,
  useSetTabState,
} from '@/app/providers/reactqueryProvider';
import { cn } from '../utils/tailwindMerge';

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ children, isActive, onClick }) => {
  const cachedTheme = useThemeState();

  return (
    <li
      className={cn(
        `cursor-pointer p-1 text-sm lg:text-base rounded-3xl transition-all duration-200, ${
          isActive
            ? `${cachedTheme?.activeTextColor} ${cachedTheme?.activeBg} scale-105 `
            : ''
        }`
      )}
      onClick={onClick}
    >
      <span>{children}</span>
    </li>
  );
};

interface TabsProps {
  componentId: string;
  className: string;
  tabs: [string, React.ReactNode][];
}

const CategoryTabs: React.FC<TabsProps> = ({
  componentId,
  tabs,
  className,
}) => {
  const tabState = useTabState();
  const setTabState = useSetTabState();

  const handleTabClick = useCallback(
    (label: string) => {
      setTabState(componentId, label);
    },
    [componentId, setTabState]
  );

  return (
    <ul className={`${className}`}>
      {tabs?.map(([label, content], index) => (
        <Tab
          key={index}
          isActive={tabState?.[componentId] === label}
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
