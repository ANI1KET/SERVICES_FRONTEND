"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { useAppDispatch } from "@/app/store/hooks/hooks";
import { RemoveActiveTab } from "@/app/store/slices/tabSlice";

// const MiddleLayout: React.FC<{
//   upperComponent: React.ReactNode;
//   lowerComponent: React.ReactNode;
// }> = ({ upperComponent, lowerComponent }) => {
const MiddleLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState<boolean>(true);

  const updateVisibility = useCallback(
    (current: number) => {
      const direction = current - scrollYProgress.getPrevious()!;
      const threshold = window.innerHeight * 0.44;

      setVisible(window.scrollY < threshold || direction < 0);
    },
    [scrollYProgress]
  );

  useMotionValueEvent(scrollYProgress, "change", updateVisibility);

  const animationProps = {
    animate: { y: visible ? 0 : -40, opacity: visible ? 1 : 0 },
    exit: { y: -20, opacity: 0 },
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: "easeOut",
    },
  };

  useEffect(() => {
    dispatch(RemoveActiveTab("HeaderTab"));
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          {...animationProps}
          className="max-sm:hidden h-[12vh] w-[71vw] mx-auto rounded-xl shadow-2xl sticky top-[5.2vh] mt-[-6vh] mb-[-6vh] border-2 border-black bg-white "
        >
          {children}
          {/* {upperComponent}
          <hr className="border-black" />
          {lowerComponent} */}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MiddleLayout;
