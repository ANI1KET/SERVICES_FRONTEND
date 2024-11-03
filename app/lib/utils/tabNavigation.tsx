"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { setActiveTab, setCursorPosition } from "@/app/store/slices/tabSlice";

interface Position {
  left: number;
  width: number;
  opacity: number;
}

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onMouseEnter: (position: Position) => void;
  onClick: (position: Position) => void;
}

const Tab: React.FC<TabProps> = ({
  children,
  isActive,
  onMouseEnter,
  onClick,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const handleInteraction = (callback: (position: Position) => void) => {
    if (ref.current) {
      const { offsetLeft, clientWidth } = ref.current;
      callback({ left: offsetLeft, width: clientWidth, opacity: 1 });
    }
  };

  return (
    <li
      ref={ref}
      onMouseEnter={() => handleInteraction(onMouseEnter)}
      onClick={() => handleInteraction(onClick)}
      className={`cursor-pointer px-3 z-10 text-sm lg:text-base uppercase ${
        isActive ? "text-white scale-110" : "text-white"
      }`}
    >
      {children}
    </li>
  );
};

const Cursor: React.FC<{ position: Position; sliderClass?: string }> = ({
  position,
  sliderClass,
}) => (
  <motion.li
    animate={{ ...position }}
    className={`absolute z-0 ${sliderClass}`}
  />
);

interface SlideTabsProps {
  componentId: string;
  tabs?: [string, React.ReactNode?][];
  className?: string;
  sliderClass?: string;
}

const SlideTabs: React.FC<SlideTabsProps> = ({
  tabs,
  componentId,
  className,
  sliderClass,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const activeTab = useAppSelector(
    (state) => state.tabs.activeTabs[componentId]
  );
  const activeTabPosition = useAppSelector(
    (state) => state.tabs.cursorPosition[componentId]
  );

  const [hoveredPosition, setHoveredPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const handleTabHover = (position: Position) => setHoveredPosition(position);
  const handleTabClick = (label: string, position: Position) => {
    dispatch(setActiveTab({ componentId, activeTab: label }));
    dispatch(setCursorPosition({ [componentId]: position }));
    if (componentId !== "SearchTab") router.push(`/${label}`);
  };

  const cursorPosition =
    hoveredPosition.opacity > 0 ? hoveredPosition : activeTabPosition;

  return (
    <ul
      onMouseEnter={() =>
        setHoveredPosition((prev) => ({ ...prev, opacity: 1 }))
      }
      onMouseLeave={() =>
        setHoveredPosition((prev) => ({ ...prev, opacity: 0 }))
      }
      className={`relative ${className}`}
    >
      {tabs?.map(([label, content], index) => (
        <Tab
          key={index}
          isActive={activeTab === label}
          onMouseEnter={handleTabHover}
          onClick={(position) => handleTabClick(label, position)}
        >
          {content}
        </Tab>
      ))}
      <Cursor position={cursorPosition} sliderClass={sliderClass} />
    </ul>
  );
};

export default SlideTabs;
