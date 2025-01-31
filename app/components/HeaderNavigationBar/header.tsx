'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

import {
  useDeleteTabState,
  useTabState,
} from '@/app/providers/reactqueryProvider';
import { HeaderTabs } from '../../lib/utils/tabs';
import NavigationTabs from '../../lib/ui/NavigationTabs';

const Header: React.FC = () => {
  const router = useRouter();
  const tabState = useTabState();
  const { data: session } = useSession();
  const deleteTabState = useDeleteTabState();

  return (
    <div className="max-sm:hidden z-10 text-xl flex items-start h-[8vh] w-full sticky top-0 left-0 right-0 ">
      <div
        className="h-[8vh] w-[12vw] flex justify-center items-center rounded-br-2xl cursor-pointer border-b-2 border-r-2 border-black bg-green-300"
        onClick={() => {
          deleteTabState('HeaderTab');
          router.push('/');
        }}
      >
        {/* {'AfnoSansar'.split('').map((char, index) => ( */}
        {'Aniket'.split('').map((char, index) => (
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
        className="h-[5.5vh] w-[70vw] flex items-center justify-around border-b-2 border-black bg-green-300"
      />

      <div className="h-[8vh] w-[18vw] flex justify-around items-center flex-row-reverse p-1 rounded-bl-2xl border-b-2 border-l-2 border-black bg-green-300">
        <div className="cursor-pointer relative group">
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

          <div className="absolute right-0 w-24 bg-green-300 shadow-lg rounded-lg border opacity-0 group-hover:opacity-100 group-hover:block hidden border-black">
            <ul>
              <li
                className="p-2 hover:scale-105 cursor-pointer rounded-lg"
                // onClick={() => router.push("/profile")}
              >
                Profile
              </li>
              {session ? (
                <li
                  className="p-2 hover:scale-105 cursor-pointer rounded-lg"
                  onClick={() => signOut({ redirect: false })}
                >
                  Logout
                </li>
              ) : (
                <li
                  className="p-2 hover:scale-105 cursor-pointer rounded-lg"
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </li>
              )}
            </ul>
          </div>
        </div>
        <p className="cursor-pointer bg-black text-white p-1 text-base rounded-3xl relative group">
          <span
            onClick={() => router.push(`/list/${tabState?.ListCategoryTab}`)}
          >
            List Property
          </span>
          {session?.user.role === 'USER' && (
            <span
              className="absolute left-1/2 top-full mt-[1px] w-24 p-1 -translate-x-1/2 scale-0 rounded-xl bg-green-300 text-base text-black transition-all group-hover:scale-100 border border-black"
              onClick={() => router.push('/upgrade')}
            >
              Upgrade to list property
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Header;
