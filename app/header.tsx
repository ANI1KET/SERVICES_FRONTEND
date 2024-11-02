"use client";

import React, {
  useRef,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { motion } from "framer-motion";

interface Position {
  left: number;
  width: number;
  opacity: number;
}

interface TabProps {
  children: ReactNode;
  setHoveredPosition: Dispatch<SetStateAction<Position>>;
  setActiveTabPosition: Dispatch<SetStateAction<Position>>;
  isActive: boolean;
  onClick: () => void;
}

interface CursorProps {
  position: Position;
}

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black"
    />
  );
};

const Tab: React.FC<TabProps> = ({
  children,
  setHoveredPosition,
  setActiveTabPosition,
  isActive,
  onClick,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;

    const { width } = ref.current.getBoundingClientRect();
    setHoveredPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
  };

  const handleClick = () => {
    if (!ref.current) return;

    const { width } = ref.current.getBoundingClientRect();
    setActiveTabPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
    onClick();
  };

  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`cursor-pointer px-3 z-10 text-base uppercase ${
        isActive ? "text-white scale-110" : "text-white"
      }`}
    >
      {children}
    </li>
  );
};

const SlideTabs = () => {
  const [hoveredPosition, setHoveredPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeTabPosition, setActiveTabPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ul
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoveredPosition((prev) => ({
          ...prev,
          opacity: 0,
        }));
      }}
      className="h-[7vh] w-fit flex items-center mx-auto "
    >
      {["Home", "Pricing", "Features", "Docs", "Blog"].map((tab) => (
        <Tab
          key={tab}
          setHoveredPosition={setHoveredPosition}
          setActiveTabPosition={setActiveTabPosition}
          isActive={activeTab === tab}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </Tab>
      ))}

      <Cursor position={isHovering ? hoveredPosition : activeTabPosition} />
    </ul>
  );
};

const Header = () => {
  return (
    <div className="h-[10vh] w-full mx-auto fixed left-0 right-0 bg-green-500 grid grid-cols-[1fr_auto_1fr] ">
      <div className=" ">233333333wffffffffffffffffffffffffffffffff</div>

      <SlideTabs />

      <div className=" ">Other3eeeeeeeeeeeeeeeeeeeeeeee2</div>
    </div>
  );
};

export default Header;
