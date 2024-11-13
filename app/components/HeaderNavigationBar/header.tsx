"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { HeaderTabs } from "../../lib/utils/tabs";
import NavigationTabs from "../../lib/ui/NavigationTabs";
import { useAppDispatch } from "@/app/store/hooks/hooks";
import { RemoveActiveTab } from "@/app/store/slices/tabSlice";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="max-sm:hidden text-xl flex items-start h-[8vh] w-full fixed left-0 right-0 ">
      <div
        className="h-[8vh] w-[15vw] flex justify-center items-center rounded-br-2xl cursor-pointer border-b-2 border-r-2 border-black bg-white "
        onClick={() => {
          router.push("/");
          dispatch(RemoveActiveTab("HeaderTab"));
        }}
      >
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

      <NavigationTabs
        tabs={HeaderTabs}
        componentId="HeaderTab"
        className="h-[5.5vh] w-[70vw] flex items-center justify-around border-b-2 border-black bg-white "
      />

      <div className="h-[8vh] w-[15vw] flex justify-center items-center flex-row-reverse rounded-bl-2xl border-b-2 border-l-2 border-black bg-white ">
        <div>B</div>
        <div>A</div>
      </div>
    </div>
  );
};

export default Header;
