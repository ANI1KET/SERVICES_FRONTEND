// "use client";

// import { useEffect, useState, useCallback } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent,
// } from "framer-motion";
// import UpperSearchBox from "@/app/components/HomeLayouts/MiddleLayout/UpperSearchBox";
// import LowerSearchBox from "@/app/components/HomeLayouts/MiddleLayout/LowerSearchBox";

// const MiddleLayout: React.FC = () => {
//   const { scrollYProgress } = useScroll();
//   const [visible, setVisible] = useState<boolean>(false);

//   // Update visibility based on scroll position
//   const updateVisibility = useCallback(
//     (current: number) => {
//       const direction = current - scrollYProgress.getPrevious()!;
//       const threshold = window.innerHeight * 0.44;

//       setVisible(window.scrollY < threshold || direction < 0);
//     },
//     [scrollYProgress]
//   );

//   useMotionValueEvent(scrollYProgress, "change", updateVisibility);

//   // Set initial visibility state with a delay
//   useEffect(() => {
//     const timer = setTimeout(() => setVisible(true), 100);
//     return () => clearTimeout(timer); // Clean up the timer on unmount
//   }, []);

//   // Define motion animation properties
//   const animationProps = {
//     initial: { y: -20, opacity: 0 },
//     animate: { y: visible ? 0 : -40, opacity: visible ? 1 : 0 },
//     exit: { y: -20, opacity: 0 },
//     transition: {
//       duration: 0.6,
//       delay: 0.1,
//       ease: "easeOut",
//     },
//   };

//   return (
//     <>
//       <AnimatePresence mode="wait">
//         {visible && (
//           <motion.div
//             {...animationProps}
//             // className="block max-sm:hidden h-[12vh] w-[60vw] mx-auto rounded-xl shadow-2xl drop-shadow-xl sticky top-[5.4vh] mt-[-6vh] mb-[-6vh] backdrop-blur-3xl "
//             className="block max-sm:hidden h-[12vh] w-[71vw] mx-auto rounded-xl shadow-2xl drop-shadow-xl sticky top-[5.4vh] mt-[-6vh] mb-[-6vh] bg-green-500 "
//           >
//             <UpperSearchBox />
//             <hr />
//             <LowerSearchBox />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default MiddleLayout;

"use client";

import { useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { useAppDispatch } from "@/app/store/hooks/hooks";
import { RemoveActiveTab } from "@/app/store/slices/tabSlice";
import UpperSearchBox from "@/app/components/HomeLayouts/MiddleLayout/UpperSearchBox";
import LowerSearchBox from "@/app/components/HomeLayouts/MiddleLayout/LowerSearchBox";

const MiddleLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState<boolean>(true);

  // Update visibility based on scroll position
  const updateVisibility = useCallback(
    (current: number) => {
      const direction = current - scrollYProgress.getPrevious()!;
      const threshold = window.innerHeight * 0.44;

      setVisible(window.scrollY < threshold || direction < 0);
    },
    [scrollYProgress]
  );

  useMotionValueEvent(scrollYProgress, "change", updateVisibility);

  // Define motion animation properties
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
  });
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          {...animationProps}
          // className="block max-sm:hidden h-[12vh] w-[60vw] mx-auto rounded-xl shadow-2xl drop-shadow-xl sticky top-[5.4vh] mt-[-6vh] mb-[-6vh] backdrop-blur-3xl "
          className="block max-sm:hidden h-[10vh] w-[71vw] mx-auto rounded-xl shadow-2xl drop-shadow-xl sticky top-[5.4vh] mt-[-5vh] mb-[-5vh] bg-green-500 "
        >
          <UpperSearchBox />
          <hr />
          <LowerSearchBox />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MiddleLayout;
