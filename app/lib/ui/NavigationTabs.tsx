'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

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
        'cursor-pointer text-sm lg:text-base rounded-3xl transition-all duration-200 hover:scale-105',
        isActive &&
          `${cachedTheme?.activeBg} ${cachedTheme?.activeTextColor} p-1 scale-105`
      )}
      onClick={onClick}
    >
      <span>{children}</span>
    </li>
  );
};

interface TabsProps {
  className: string;
  componentId: string;
  tabs: [string, React.ReactNode][];
}

const NavigationTabs: React.FC<TabsProps> = ({
  tabs,
  className,
  componentId,
}) => {
  const router = useRouter();
  const tabState = useTabState();
  const setTabState = useSetTabState();

  const handleTabClick = useCallback(
    (label: string) => {
      router.push(`/${label}`);
      setTabState(componentId, label);
    },
    [componentId, router, setTabState]
  );

  return (
    <ul className={cn(className)}>
      {tabs?.map(([label, content], index) => {
        return (
          <Tab
            key={index}
            isActive={tabState?.[componentId] === label}
            onClick={() => handleTabClick(label)}
          >
            {content}
          </Tab>
        );
      })}
    </ul>
  );
};

export default NavigationTabs;
