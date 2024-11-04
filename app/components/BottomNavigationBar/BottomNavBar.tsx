"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BottomTabs } from "../../lib/utils/tabs";
import SlideTabs from "../../lib/ui/tabNavigation";

const BottomNavBar = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: "120vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 1 },
      }}
      className="hidden max-sm:flex"
    >
      <AnimatePresence>
        {isPanelOpen && (
          <AnimatedComponent setIsPanelOpen={setIsPanelOpen} index={5} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="fixed bottom-[6.6vh] left-1/2 -translate-x-1/2 z-20 cursor-pointer rounded-t-2xl p-1 bg-green-500"
            onClick={() => setIsPanelOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-from-line"
            >
              <path d="m18 9-6-6-6 6" />
              <path d="M12 3v14" />
              <path d="M5 21h14" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <SlideTabs
        componentId="BottomTab"
        tabs={BottomTabs}
        className={`max-sm:flex max-sm:items-center max-sm:justify-around max-sm:h-[8vh] z-10 max-sm:fixed max-sm:bottom-[-1px] max-sm:w-full ${
          isPanelOpen ? "max-sm:rounded-t-none" : "max-sm:rounded-t-3xl"
        } backdrop-blur-3xl bg-green-500 `}
        sliderClass="h-[6vh] rounded-full bg-black"
      />
    </motion.div>
  );
};

export default BottomNavBar;

interface Props {
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

const AnimatedComponent: React.FC<Props> = ({ setIsPanelOpen, index }) => {
  if (index === 0)
    return (
      <motion.div
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100vh", opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="fixed bottom-[7.5vh] left-0 right-0 z-0 w-full flex flex-col items-center"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: 20 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="cursor-pointer rounded-t-2xl p-1 bg-green-500 -mt-1 "
          onClick={() => setIsPanelOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-from-line"
          >
            <path d="m18 9-6-6-6 6" />
            <path d="M12 3v14" />
            <path d="M5 21h14" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: 20 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="w-full h-[50vh] bg-green-500 rounded-t-3xl p-4"
        ></motion.div>
      </motion.div>
    );
  else if (index === 1)
    return (
      <motion.div
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100vh", opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="fixed bottom-[7.9vh] left-0 right-0 z-0 w-full flex flex-col items-center"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          className="cursor-pointer rounded-t-2xl p-1 bg-green-500 -mt-1 "
          onClick={() => setIsPanelOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-from-line"
          >
            <path d="m18 9-6-6-6 6" />
            <path d="M12 3v14" />
            <path d="M5 21h14" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="w-full h-[50vh] bg-green-500 rounded-t-3xl p-4"
        ></motion.div>
      </motion.div>
    );
  else if (index === 2) {
    return (
      <motion.div
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        exit={{ y: 30, transition: { duration: 0.2 } }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-[7vh] left-0 right-0 w-full flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="cursor-pointer rounded-t-2xl p-1 bg-green-500 -mt-1 "
          onClick={() => setIsPanelOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 9-6-6-6 6" />
            <path d="M12 3v14" />
            <path d="M5 21h14" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: 20, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 90, damping: 15 }}
          className="w-full h-[50vh] bg-green-500 rounded-t-3xl p-4"
        />
      </motion.div>
    );
  } else if (index === 3) {
    return (
      <motion.div
        initial={{ y: "100vh", scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: "100vh", scale: 0.9, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.68, -0.55, 0.27, 1.55],
        }}
        className="fixed bottom-[7.9vh] left-0 right-0 z-0 w-full flex flex-col items-center"
      >
        <motion.div
          initial={{ y: 30, rotate: -15, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: 30, rotate: -15, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
            delay: 0.2,
          }}
          className="cursor-pointer rounded-t-2xl p-1 bg-green-500 -mt-1 "
          onClick={() => setIsPanelOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-from-line"
          >
            <path d="m18 9-6-6-6 6" />
            <path d="M12 3v14" />
            <path d="M5 21h14" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ y: 30, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 30, scale: 0.95, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.4,
          }}
          className="w-full h-[50vh] bg-green-500 rounded-t-3xl p-4"
        ></motion.div>
      </motion.div>
    );
  } else if (index === 4) {
    return (
      <motion.div
        initial={{ y: "100vh", scale: 0.9, opacity: 0.7 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: "100vh", scale: 0.9, opacity: 0.7 }}
        transition={{
          duration: 1.2,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
        className="fixed bottom-[7.9vh] left-0 right-0 z-0 w-full flex flex-col items-center"
      >
        <motion.div
          initial={{ y: 30, rotate: -5, opacity: 0.8 }}
          animate={{ y: 0, rotate: 0, opacity: 1, backgroundColor: "#4ade80" }}
          exit={{ y: 30, rotate: -5, opacity: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 20,
            delay: 0.3,
            duration: 0.8,
          }}
          className="cursor-pointer rounded-t-2xl p-1 bg-green-500 -mt-1 "
          onClick={() => setIsPanelOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-from-line"
          >
            <path d="m18 9-6-6-6 6" />
            <path d="M12 3v14" />
            <path d="M5 21h14" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ y: 40, scale: 0.95, opacity: 0.7 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 40, scale: 0.95, opacity: 0.7 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 18,
            delay: 0.5,
            duration: 1,
          }}
          className="w-full h-[50vh] bg-gradient-to-b from-green-500 to-green-400 rounded-t-3xl p-4 shadow-xl"
        ></motion.div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ y: "110vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "110vh", opacity: 0, transition: { duration: 1 } }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.8, 0.5, 1],
          opacity: { duration: 0.6 },
        }}
        className="fixed bottom-[7vh] left-0 right-0 w-full flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.85, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{
            scale: 0.85,
            y: 15,
            opacity: 0,
            transition: { duration: 0.8 },
          }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="cursor-pointer rounded-t-2xl p-1 bg-green-500 -mb-1"
          onClick={() => setIsPanelOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 9-6-6-6 6" />
            <path d="M12 3v14" />
            <path d="M5 21h14" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0.8, transition: { duration: 1 } }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 15,
            duration: 0.8,
          }}
          className="w-full h-[60vh] bg-green-500 rounded-t-3xl p-4"
        />
      </motion.div>
    );
  }
};
