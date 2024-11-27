"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { HeaderTabs } from "../../lib/utils/tabs";
import NavigationTabs from "../../lib/ui/NavigationTabs";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks/hooks";
import useBreakpoint from "@/app/lib/utils/useBreakpoint";
import { RemoveActiveTab } from "@/app/store/slices/tabSlice";

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeListTab = useAppSelector(
    (state) => state.tabs.activeTabs.ListCategoryTab
  );

  const { isMobile } = useBreakpoint();
  return isMobile ? null : (
    <div className="max-sm:hidden z-10 text-xl flex items-start h-[8vh] w-full sticky top-0 left-0 right-0 ">
      <div
        className="h-[8vh] w-[12vw] flex justify-center items-center rounded-br-2xl cursor-pointer border-b-2 border-r-2 border-black bg-white "
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

      <div className="h-[8vh] w-[18vw] flex justify-around items-center flex-row-reverse p-1 rounded-bl-2xl border-b-2 border-l-2 border-black bg-white ">
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-user-round"
          >
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <p
          className="cursor-pointer bg-black text-white p-1 text-base rounded-3xl"
          onClick={() => router.push(`/list/${activeListTab}`)}
        >
          List Property
        </p>
      </div>
    </div>
  );
};

export default Header;
