"use client";

import React from "react";
import { motion } from "framer-motion";
import SlideTabs from "../../lib/utils/tabNavigation";
import { NavBarTabs } from "../../lib/utils/tabs";

const Header: React.FC = () => {
  return (
    <div className="max-sm:hidden text-xl flex items-start h-[8vh] w-full fixed left-0 right-0 ">
      {/* <div className="h-[8vh] w-[15vw] flex justify-center items-center rounded-br-2xl backdrop-blur-3xl "> */}
      <div className="h-[8vh] w-[15vw] flex justify-center items-center rounded-br-2xl bg-green-500 ">
        {"AfnoSansar".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <SlideTabs
        tabs={NavBarTabs}
        componentId="NavBar"
        // className="h-[5.5vh] w-[70vw] flex items-center justify-around backdrop-blur-3xl "
        className="h-[5.5vh] w-[70vw] flex items-center justify-around bg-green-500 "
        sliderClass="h-[3.8vh] rounded-full bg-black"
      />
      {/* <div className="h-[8vh] w-[15vw] flex justify-center items-center flex-row-reverse rounded-bl-2xl backdrop-blur-3xl "> */}
      <div className="h-[8vh] w-[15vw] flex justify-center items-center flex-row-reverse rounded-bl-2xl bg-green-500 ">
        <div>B</div>
        <div>A</div>
      </div>
    </div>
  );
};

export default Header;
