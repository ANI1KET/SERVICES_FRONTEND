"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SearchPanel from "./PanelComponent/panel";
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
          <motion.div
            initial={{
              y: "0vh",
              x: "85vw",
              width: "15vw",
              height: "6vh",
              rotate: -45,
              borderRadius: "60%",
            }}
            animate={{
              y: ["-2vh", "-5vh", "-9vh", "-10vh", 0],
              x: ["80vw", "75vw", "45vw", "30vw", 0],
              width: ["15vw", "20vw", "35vw", "45vw", "100vw"],
              height: ["15vh", "12vh", "28vh", "35vh", "70vh"],
              rotate: [-45, -40, -15, -5, 0],
              borderRadius: ["50%", "50%", "50%", "50%", "1.5rem 1.5rem 0 0"],
            }}
            transition={{
              duration: 0.3,
              ease: [0.42, 0, 0.58, 1],
              opacity: { duration: 0.6 },
            }}
            exit={{
              y: ["0", "-10vh", "-5vh", "-3vh", "-2vh", "-1vh", "0vh"],
              x: ["0", "35vw", "55vw", "65vw", "80vw", "85vw", "85vw"],
              width: ["100vw", "35vw", "25vw", "20vw", "15vw", "10vw", "10vw"],
              height: ["50vh", "25vh", "20vh", "15vh", "10vh", "8vh", "5vh"],
              rotate: [0, -5, -15, -25, -40, -45, -45],
              borderRadius: ["0%", "50%", "50%", "50%", "50%", "50%", "50%"],
              opacity: 0,
              transition: {
                duration: 0.5,
                ease: [0.42, 0, 0.58, 1],
                opacity: { duration: 0.8 },
              },
            }}
            className="fixed bottom-[7.9vh] left-0 right-0 flex flex-col items-center bg-white "
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 15,
                duration: 0.2,
                delay: 0.4,
              }}
              className="h-[70vh] rounded-t-3xl w-full p-2 overflow-y-scroll border-2 border-b-0 border-black "
            >
              <SearchPanel />
            </motion.div>

            <motion.div
              initial={{ scale: 0.85, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
                duration: 0.2,
                delay: 0.4,
              }}
              className="cursor-pointer rounded-full p-[0.3rem] backdrop-blur-3xl border-2 border-black absolute bottom-[0.8vh] right-1 bg-white "
              onClick={() => setIsPanelOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentcolor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="fixed bottom-[8.5vh] right-1 z-20 cursor-pointer rounded-full p-[0.3rem] border-2 border-black bg-white "
            onClick={() => setIsPanelOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentcolor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <SlideTabs
        componentId="BottomTab"
        tabs={BottomTabs}
        className={`max-sm:flex max-sm:items-center max-sm:justify-around max-sm:h-[8vh] z-10 max-sm:fixed max-sm:bottom-[-1px] max-sm:w-full ${
          isPanelOpen ? "max-sm:rounded-t-none" : "max-sm:rounded-t-3xl"
        } border-2 border-black bg-white `}
        sliderClass="h-[6vh] rounded-full bg-black"
      />
    </motion.div>
  );
};

export default BottomNavBar;
