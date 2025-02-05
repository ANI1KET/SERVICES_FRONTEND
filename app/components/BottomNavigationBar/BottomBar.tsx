'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import {
  RentIcon,
  ShopIcon,
  FoodIcon,
  ProfileIcon,
  PropertyIcon,
  ClientIcon,
} from '@/app/lib/icon/svg';
import {
  useTabState,
  useThemeState,
  useSetTabState,
} from '@/app/providers/reactqueryProvider';
import { cn } from '@/app/lib/utils/tailwindMerge';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';

const BottomBar = () => {
  const router = useRouter();
  const tabState = useTabState();
  const cachedTheme = useThemeState();
  const setTabState = useSetTabState();
  const { isMobile } = useBreakpoint();
  const { data: session } = useSession();

  const handleTabClick = useCallback(
    (label: string) => {
      router.push(`/${label}`);
      setTabState('BottomTabs', label);
    },
    [router, setTabState]
  );

  if (!isMobile) return null;
  return (
    <div className="">
      <div
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          'flex items-center justify-between h-[8vh] fixed bottom-[-1px] w-full border-2 '
        )}
      >
        <div
          className={cn(
            tabState?.['BottomTabs'] === 'renter' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('renter')}
        >
          <RentIcon />
          Rent
        </div>
        <div
          className={cn(
            tabState?.['BottomTabs'] === 'shopper' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('shopper')}
        >
          <ShopIcon />
          Shop
        </div>
        <div
          className={cn(
            tabState?.['BottomTabs'] === 'foodie' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('foodie')}
        >
          <FoodIcon />
          Food
        </div>
        <div
          className={cn(
            tabState?.['BottomTabs'] === '' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={34}
            height={34}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-house`}
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          Home
        </div>
        <div
          className={cn(
            tabState?.['BottomTabs'] === 'buyer' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('buyer')}
        >
          <PropertyIcon />
          Buy
        </div>
        <div
          className={cn(
            tabState?.['BottomTabs'] === 'client' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('client')}
        >
          <ClientIcon />
          Client
        </div>
        <div
          className={cn(
            tabState?.['BottomTabs'] === 'profile' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'relative cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200 group'
          )}
          onClick={() => {
            setTabState('BottomTabs', 'profile');
          }}
        >
          <ProfileIcon />
          Profile
          <div
            className={cn(
              cachedTheme?.bg,
              cachedTheme?.textColor,
              cachedTheme?.borderColor,
              'absolute text-sm bottom-full right-0 w-20 rounded-lg border hidden group-hover:opacity-100 group-hover:block'
            )}
          >
            <ul>
              {session ? (
                <>
                  <li
                    className="p-2 cursor-pointer "
                    onClick={() => signOut({ redirect: false })}
                  >
                    Logout
                  </li>
                  {session.user.role !== 'USER' && (
                    <li
                      className={cn(
                        cachedTheme?.borderColor,
                        'p-2 cursor-pointer border-t-2 rounded-lg'
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
                </>
              ) : (
                <>
                  <li
                    className="p-2 cursor-pointer "
                    onClick={() => router.push('/auth/signup')}
                  >
                    Signup
                  </li>
                  <li
                    className={cn(
                      cachedTheme?.borderColor,
                      'p-2 cursor-pointer border-t-2 rounded-lg'
                    )}
                    onClick={() => router.push('/auth/login')}
                  >
                    Login
                  </li>
                </>
              )}
              <li
                className={cn(
                  cachedTheme?.borderColor,
                  'p-2 cursor-pointer border-t-2 rounded-lg'
                )}
                onClick={() => router.push('/profile')}
              >
                Profile
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
