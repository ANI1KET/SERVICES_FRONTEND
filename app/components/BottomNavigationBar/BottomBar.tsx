'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import {
  RentIcon,
  ShopIcon,
  FoodIcon,
  HomeIcon,
  ProfileIcon,
  PropertyIcon,
  ClientIcon,
} from '@/app/lib/icon/svg';
import {
  useTabState,
  useSetTabState,
} from '@/app/providers/reactqueryProvider';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';

const BottomBar = () => {
  const router = useRouter();
  const tabState = useTabState();
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
        className={`flex items-center justify-around h-[8vh] fixed bottom-[-1px] w-full border-2 border-black bg-white`}
      >
        <div
          className={`cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200 ${
            tabState?.['BottomTabs'] === 'renter'
              ? `text-green-400 scale-105`
              : ''
          }`}
          onClick={() => handleTabClick('renter')}
        >
          <RentIcon />
          Rent
        </div>
        <div
          className={`cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200 ${
            tabState?.['BottomTabs'] === 'shopper'
              ? `text-green-400 scale-105`
              : ''
          }`}
          onClick={() => handleTabClick('shopper')}
        >
          <ShopIcon />
          Shop
        </div>
        <div
          className={`cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200 ${
            tabState?.['BottomTabs'] === 'foodie'
              ? `text-green-400 scale-105`
              : ''
          }`}
          onClick={() => handleTabClick('foodie')}
        >
          <FoodIcon />
          Food
        </div>
        <div
          className={`cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200 mb-1 ${
            tabState?.['BottomTabs'] === '' ? `text-green-400 scale-105` : ''
          }`}
          onClick={() => handleTabClick('')}
        >
          <HomeIcon />
          Home
        </div>
        <div
          className={`cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200 ${
            tabState?.['BottomTabs'] === 'buyer'
              ? `text-green-400 scale-105`
              : ''
          }`}
          onClick={() => handleTabClick('buyer')}
        >
          <PropertyIcon />
          Buy
        </div>
        <div
          className={`cursor-pointer  text-center text-xs lg:text-base rounded-3xl transition-all duration-200 ${
            tabState?.['BottomTabs'] === 'client'
              ? `text-green-400 scale-105`
              : ''
          }`}
          onClick={() => handleTabClick('client')}
        >
          <ClientIcon />
          Client
        </div>
        <div
          className={`relative cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200 group ${
            tabState?.['BottomTabs'] === 'profile'
              ? `text-green-400 scale-105`
              : ''
          }`}
          onClick={() => {
            setTabState('BottomTabs', 'profile');
          }}
        >
          <ProfileIcon />
          Profile
          <div className="absolute text-sm bottom-full -right-1 w-16 bg-white rounded-lg border hidden group-hover:opacity-100 group-hover:block border-black">
            <ul>
              <li
                className="p-2 hover:scale-105 cursor-pointer rounded-lg"
                onClick={() => router.push('/profile')}
              >
                Profile
              </li>
              {session ? (
                <li
                  className="p-2 hover:scale-105 cursor-pointer border-t-2 border-black rounded-t-md"
                  onClick={() => signOut({ redirect: false })}
                >
                  Logout
                </li>
              ) : (
                <li
                  className="p-2 hover:scale-105 cursor-pointer border-t-2 border-black "
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
