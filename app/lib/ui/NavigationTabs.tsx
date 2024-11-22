"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { setActiveTab } from "@/app/store/slices/tabSlice";

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ children, isActive, onClick }) => {
  return (
    <li
      className={`cursor-pointer text-sm lg:text-base rounded-3xl transition-all duration-200 ${
        isActive ? `text-white bg-black p-1 scale-105 ` : ""
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

const NavigationTabs: React.FC<TabsProps> = ({
  tabs,
  componentId,
  className,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state) => state.tabs.activeTabs[componentId]
  );

  const handleTabClick = useCallback(
    (label: string) => {
      dispatch(setActiveTab({ componentId, activeTab: label }));
      router.push(`/${label}`);
    },
    [componentId, dispatch, router]
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

export default NavigationTabs;
