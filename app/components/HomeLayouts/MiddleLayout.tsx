'use client';

import React, { useState, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';

// const MiddleLayout: React.FC<{
//   upperComponent: React.ReactNode;
//   lowerComponent: React.ReactNode;
// }> = ({ upperComponent, lowerComponent }) => {
const MiddleLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isMobile } = useBreakpoint();
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

  useMotionValueEvent(scrollYProgress, 'change', updateVisibility);

  const animationProps = {
    animate: { y: visible ? 0 : -40, opacity: visible ? 1 : 0 },
    exit: { y: -20, opacity: 0 },
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: 'easeOut',
    },
  };

  if (isMobile) {
    return null;
  }
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          {...animationProps}
          className="max-sm:hidden h-[12vh] w-[71vw] mx-[11.5vw] rounded-xl shadow-2xl sticky top-[5.3vh] mt-[-6vh] mb-[-6vh] border-2 border-black bg-green-300"
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
