'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
// import { AnimatePresence, motion } from 'framer-motion';

import {
  useThemeState,
  useDeleteTabState,
} from '@/app/providers/reactqueryProvider';
import { HeaderTabs } from '../../lib/utils/tabs';
import { cn } from '@/app/lib/utils/tailwindMerge';
import NavigationTabs from '../../lib/ui/NavigationTabs';
import { canAccessDashboard, permissions } from '@/app/lib/scalableComponents';

const Header: React.FC = () => {
  const router = useRouter();
  const cachedTheme = useThemeState();
  const { data: session } = useSession();
  const deleteTabState = useDeleteTabState();

  // const texts = [
  //   'Another Name',
  //   'More Text',
  // ];
  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
  //   }, 3000);

  //   return () => clearTimeout(interval);
  // }, [currentIndex, texts.length]);
  return (
    <div className="max-sm:hidden z-10 text-xl flex items-start h-[8vh] w-full sticky top-0 left-0 right-0 ">
      <div
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          'h-[8vh] w-[12vw] flex justify-center items-center rounded-br-2xl cursor-pointer border-r border-b'
        )}
        onClick={() => {
          deleteTabState('HeaderTab');
          router.push('/');
        }}
      >
        {'AfnoSansaar'.split('').map((char, index) => (
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

      <div className="h-[8vh] flex flex-col">
        <NavigationTabs
          tabs={HeaderTabs}
          componentId="HeaderTab"
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.textColor,
            cachedTheme?.borderColor,
            'h-[5.5vh] w-[70vw] flex items-center justify-around border-b'
          )}
        />
        {/* <div className="w-full h-[2.5vh] overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={texts[currentIndex]}
              className={cn(
                cachedTheme?.textColor,
                'absolute w-full font-semibold text-center text-sm'
              )}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              {texts[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div> */}
      </div>

      <div
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          'h-[8vh] w-[18vw] flex justify-around items-center flex-row-reverse p-1 rounded-bl-2xl border-b border-l'
        )}
      >
        <div className="cursor-pointer relative group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke={cachedTheme?.svgIconColor}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-user-round"
          >
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>

          <div
            className={cn(
              cachedTheme?.bg,
              cachedTheme?.textColor,
              cachedTheme?.borderColor,
              'absolute right-0 w-24 text-base border shadow-lg rounded-lg scale-0 group-hover:scale-100 transition-all '
            )}
          >
            <ul>
              <li
                className={cn(
                  cachedTheme?.hoverBg,
                  cachedTheme?.borderColor,
                  'p-2 cursor-pointer border-b rounded-lg'
                )}
                onClick={() => {
                  router.push('/interested');
                }}
              >
                Interested
              </li>
              {session ? (
                <>
                  <li
                    className={cn(
                      cachedTheme?.hoverBg,
                      cachedTheme?.borderColor,
                      'p-2 cursor-pointer border-b rounded-lg'
                    )}
                    onClick={() => router.push('/profile')}
                  >
                    Profile
                  </li>
                  {canAccessDashboard(session.user.role, 'dashboard') && (
                    <li
                      className={cn(
                        cachedTheme?.hoverBg,
                        cachedTheme?.borderColor,
                        'p-2 cursor-pointer border-b rounded-lg'
                      )}
                      onClick={() =>
                        router.push(
                          `/dashboard/${session.user.role?.toLowerCase()}`
                        )
                      }
                    >
                      Dashboard
                    </li>
                  )}
                  <li
                    className={cn(
                      cachedTheme?.hoverBg,
                      'p-2 rounded-lg cursor-pointer '
                    )}
                    onClick={() => {
                      signOut({ redirect: false });
                      // router.push('/');
                    }}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li
                    className={cn(
                      cachedTheme?.hoverBg,
                      cachedTheme?.borderColor,
                      'p-2 cursor-pointer border-b rounded-lg'
                    )}
                    onClick={() => router.push('/auth/login')}
                  >
                    Login
                  </li>
                  <li
                    className={cn(
                      cachedTheme?.hoverBg,
                      'p-2 rounded-lg cursor-pointer'
                    )}
                    onClick={() => router.push('/auth/signup')}
                  >
                    Signup
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="cursor-pointer relative group ">
          <span
            className={cn(
              cachedTheme?.activeBg,
              cachedTheme?.activeTextColor,
              'p-1 text-base rounded-xl [text-shadow:4px_2px_2px_rgba(0,0,0,0.5)]'
            )}
          >
            List Property
          </span>
          {!session ? (
            <span
              className={cn(
                'absolute left-1/2 top-full mt-[1px] w-24 p-1 -translate-x-1/2 scale-0 rounded-xl text-base text-center border transition-all group-hover:scale-100',
                cachedTheme?.bg,
                cachedTheme?.textColor,
                cachedTheme?.borderColor
              )}
              onClick={() => router.push('/auth/login')}
            >
              Login
            </span>
          ) : (
            <p
              className={cn(
                cachedTheme?.bg,
                cachedTheme?.textColor,
                cachedTheme?.borderColor,
                'absolute left-1/2 top-full mt-[1px] w-[6.5rem] -translate-x-1/2 scale-0 text-base border transition-all group-hover:scale-100 rounded-xl'
              )}
            >
              {permissions.map((route, index, list) => {
                const isPermitted = session?.user?.permission?.includes(route);
                const formattedRoute =
                  route.charAt(0).toUpperCase() + route.slice(1);
                return (
                  <span
                    key={route}
                    className={cn(
                      cachedTheme?.hoverBg,
                      cachedTheme?.borderColor,
                      !isPermitted && [
                        cachedTheme?.activeListHover,
                        cachedTheme?.activeListHoverText,
                      ],
                      index !== list.length - 1 && 'border-b-2',
                      'block w-full p-1 rounded-b-xl hover:rounded-xl transition-all duration-200 ease-in-out '
                    )}
                    onClick={() =>
                      router.push(isPermitted ? `/list/${route}` : `/upgrade`)
                    }
                    onMouseEnter={(e) =>
                      !isPermitted && (e.currentTarget.textContent = 'Upgrade')
                    }
                    onMouseLeave={(e) =>
                      !isPermitted &&
                      (e.currentTarget.textContent = formattedRoute)
                    }
                  >
                    {formattedRoute}
                  </span>
                );
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
