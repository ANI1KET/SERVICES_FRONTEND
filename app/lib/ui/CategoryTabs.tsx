'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import {
  useSetTabState,
  useTabState,
} from '@/app/providers/reactqueryProvider';

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ children, isActive, onClick }) => {
  return (
    <li
      className={`cursor-pointer p-1 text-sm lg:text-base rounded-3xl transition-all duration-200 ${
        isActive ? `text-white bg-black scale-105 ` : ''
      }`}
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
  const router = useRouter();
  const tabState = useTabState();
  const setTabState = useSetTabState();

  const handleTabClick = useCallback(
    (label: string) => {
      setTabState(componentId, label);
      if (componentId === 'ListCategoryTab') router.push(`/list/${label}`);
    },
    [componentId, router, setTabState]
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
