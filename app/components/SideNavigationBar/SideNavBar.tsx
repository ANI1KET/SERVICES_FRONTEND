'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { cn } from '../../lib/utils/tailwindMerge';
import { DashboardPermissionTabs } from '../../lib/utils/tabs';
import { useThemeState } from '../../providers/reactqueryProvider';
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from '../../lib/ui/SidebarComponent';

export function SideNavBar({ children }: { children: React.ReactNode }) {
  const cachedTheme = useThemeState();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden h-[92vh]`}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody
          className={cn(
            cachedTheme?.borderColor,
            'border justify-between gap-10 rounded-r-3xl max-sm:rounded-r-none'
          )}
        >
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {(session?.user?.permission ?? []).map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    href: `/dashboard/${session?.user.role?.toLowerCase()}/${link}`,
                    icon: DashboardPermissionTabs[link],
                    label: link.charAt(0).toUpperCase() + link.slice(1),
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                href: '#',
                label: session?.user.name ?? '',
                icon: session?.user.image && (
                  <Image
                    width={50}
                    height={50}
                    alt="Avatar"
                    src={session?.user.image as string}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
      {/* <Dashboard /> */}
    </div>
  );
}

export const Logo = () => {
  const cachedTheme = useThemeState();
  const { data: session } = useSession();
  return (
    <Link
      href={`/dashboard/${session?.user.role?.toLowerCase()}`}
      className={cn(
        cachedTheme?.textColor,
        'font-normal flex space-x-2 items-center py-1 relative'
      )}
    >
      <svg
        width={25}
        height={25}
        xmlSpace="preserve"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs />
        <g
          style={{
            stroke: 'none',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'none',
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 53.927 78.281 h 31.5 c 1.973 0 3.573 -1.6 3.573 -3.573 V 15.292 c 0 -1.973 -1.6 -3.573 -3.573 -3.573 H 4.573 C 2.6 11.719 1 13.319 1 15.292 v 59.415 c 0 1.973 1.6 3.573 3.573 3.573 h 31.5"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(230,230,230)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 84.436 11.719 H 5.564 C 3.044 11.719 1 13.763 1 16.284 v 8.732 h 88 v -8.732 C 89 13.763 86.956 11.719 84.436 11.719 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(59,154,216)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 49.501 20 H 7.378 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 42.123 c 0.553 0 1 0.448 1 1 S 50.054 20 49.501 20 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 82.622 20 h -3.814 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 h 3.814 c 0.553 0 1 0.448 1 1 S 83.175 20 82.622 20 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 73.622 20 h -3.814 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 h 3.814 c 0.553 0 1 0.448 1 1 S 74.175 20 73.622 20 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 46.907 79.28 h -3.814 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 3.814 c 0.553 0 1 0.447 1 1 S 47.46 79.28 46.907 79.28 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 85.427 10.719 H 4.573 C 2.052 10.719 0 12.771 0 15.292 v 59.416 c 0 2.521 2.052 4.572 4.573 4.572 h 31.5 c 0.552 0 1 -0.447 1 -1 s -0.448 -1 -1 -1 h -31.5 C 3.154 77.28 2 76.126 2 74.708 V 26.016 h 86 v 48.692 c 0 1.418 -1.154 2.572 -2.573 2.572 h -31.5 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 31.5 c 2.521 0 4.573 -2.051 4.573 -4.572 V 15.292 C 90 12.771 87.948 10.719 85.427 10.719 z M 2 24.016 v -8.723 c 0 -1.419 1.154 -2.573 2.573 -2.573 h 80.854 c 1.419 0 2.573 1.154 2.573 2.573 v 8.723 H 2 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 21.512 70.875 h -6.483 c -0.912 0 -1.651 -0.739 -1.651 -1.651 v -5.483 c 0 -0.912 0.739 -1.651 1.651 -1.651 h 6.483 c 0.912 0 1.651 0.739 1.651 1.651 v 5.483 C 23.163 70.136 22.424 70.875 21.512 70.875 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(216,10,0)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 39.332 70.875 h -6.483 c -0.912 0 -1.651 -0.739 -1.651 -1.651 V 58.741 c 0 -0.912 0.739 -1.651 1.651 -1.651 h 6.483 c 0.912 0 1.651 0.739 1.651 1.651 v 10.483 C 40.983 70.136 40.244 70.875 39.332 70.875 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(216,92,0)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 57.151 70.875 h -6.483 c -0.912 0 -1.651 -0.739 -1.651 -1.651 V 46.741 c 0 -0.912 0.739 -1.651 1.651 -1.651 h 6.483 c 0.912 0 1.651 0.739 1.651 1.651 v 22.483 C 58.803 70.136 58.063 70.875 57.151 70.875 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(209,184,0)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 74.971 70.875 h -6.483 c -0.912 0 -1.651 -0.739 -1.651 -1.651 V 34.741 c 0 -0.912 0.739 -1.651 1.651 -1.651 h 6.483 c 0.912 0 1.651 0.739 1.651 1.651 v 34.483 C 76.622 70.136 75.883 70.875 74.971 70.875 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(100,204,0)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 21.512 71.875 h -6.483 c -1.462 0 -2.651 -1.189 -2.651 -2.651 v -5.482 c 0 -1.462 1.189 -2.651 2.651 -2.651 h 6.483 c 1.462 0 2.651 1.189 2.651 2.651 v 5.482 C 24.163 70.686 22.974 71.875 21.512 71.875 z M 15.029 63.09 c -0.359 0 -0.651 0.292 -0.651 0.651 v 5.482 c 0 0.359 0.292 0.651 0.651 0.651 h 6.483 c 0.359 0 0.651 -0.292 0.651 -0.651 v -5.482 c 0 -0.359 -0.292 -0.651 -0.651 -0.651 H 15.029 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 39.332 71.875 h -6.483 c -1.462 0 -2.651 -1.189 -2.651 -2.651 V 58.741 c 0 -1.462 1.189 -2.651 2.651 -2.651 h 6.483 c 1.462 0 2.651 1.189 2.651 2.651 v 10.482 C 41.983 70.686 40.793 71.875 39.332 71.875 z M 32.849 58.09 c -0.359 0 -0.651 0.292 -0.651 0.651 v 10.482 c 0 0.359 0.292 0.651 0.651 0.651 h 6.483 c 0.359 0 0.651 -0.292 0.651 -0.651 V 58.741 c 0 -0.359 -0.292 -0.651 -0.651 -0.651 H 32.849 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 57.151 71.875 h -6.483 c -1.462 0 -2.651 -1.189 -2.651 -2.651 V 46.741 c 0 -1.462 1.189 -2.651 2.651 -2.651 h 6.483 c 1.462 0 2.651 1.189 2.651 2.651 v 22.482 C 59.803 70.686 58.613 71.875 57.151 71.875 z M 50.668 46.09 c -0.359 0 -0.651 0.292 -0.651 0.651 v 22.482 c 0 0.359 0.292 0.651 0.651 0.651 h 6.483 c 0.359 0 0.651 -0.292 0.651 -0.651 V 46.741 c 0 -0.359 -0.292 -0.651 -0.651 -0.651 H 50.668 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 74.971 71.875 h -6.482 c -1.462 0 -2.651 -1.189 -2.651 -2.651 V 34.741 c 0 -1.462 1.189 -2.651 2.651 -2.651 h 6.482 c 1.462 0 2.651 1.189 2.651 2.651 v 34.482 C 77.622 70.686 76.433 71.875 74.971 71.875 z M 68.488 34.09 c -0.359 0 -0.651 0.292 -0.651 0.651 v 34.482 c 0 0.359 0.292 0.651 0.651 0.651 h 6.482 c 0.359 0 0.651 -0.292 0.651 -0.651 V 34.741 c 0 -0.359 -0.292 -0.651 -0.651 -0.651 H 68.488 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
        </g>
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          cachedTheme?.textColor,
          'font-medium text-lg whitespace-pre'
        )}
      >
        AFNOSANSAR
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  const cachedTheme = useThemeState();
  const { data: session } = useSession();
  return (
    <Link
      href={`/dashboard/${session?.user.role?.toLowerCase()}`}
      className={cn(
        cachedTheme?.textColor,
        'font-normal flex space-x-2 items-center text-sm py-1 relative'
      )}
    >
      <svg
        width={25}
        height={25}
        xmlSpace="preserve"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs />
        <g
          style={{
            stroke: 'none',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'none',
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 53.927 78.281 h 31.5 c 1.973 0 3.573 -1.6 3.573 -3.573 V 15.292 c 0 -1.973 -1.6 -3.573 -3.573 -3.573 H 4.573 C 2.6 11.719 1 13.319 1 15.292 v 59.415 c 0 1.973 1.6 3.573 3.573 3.573 h 31.5"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(230,230,230)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 84.436 11.719 H 5.564 C 3.044 11.719 1 13.763 1 16.284 v 8.732 h 88 v -8.732 C 89 13.763 86.956 11.719 84.436 11.719 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(59,154,216)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 49.501 20 H 7.378 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 42.123 c 0.553 0 1 0.448 1 1 S 50.054 20 49.501 20 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 82.622 20 h -3.814 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 h 3.814 c 0.553 0 1 0.448 1 1 S 83.175 20 82.622 20 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 73.622 20 h -3.814 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 h 3.814 c 0.553 0 1 0.448 1 1 S 74.175 20 73.622 20 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 46.907 79.28 h -3.814 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 3.814 c 0.553 0 1 0.447 1 1 S 47.46 79.28 46.907 79.28 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 85.427 10.719 H 4.573 C 2.052 10.719 0 12.771 0 15.292 v 59.416 c 0 2.521 2.052 4.572 4.573 4.572 h 31.5 c 0.552 0 1 -0.447 1 -1 s -0.448 -1 -1 -1 h -31.5 C 3.154 77.28 2 76.126 2 74.708 V 26.016 h 86 v 48.692 c 0 1.418 -1.154 2.572 -2.573 2.572 h -31.5 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 31.5 c 2.521 0 4.573 -2.051 4.573 -4.572 V 15.292 C 90 12.771 87.948 10.719 85.427 10.719 z M 2 24.016 v -8.723 c 0 -1.419 1.154 -2.573 2.573 -2.573 h 80.854 c 1.419 0 2.573 1.154 2.573 2.573 v 8.723 H 2 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 21.512 70.875 h -6.483 c -0.912 0 -1.651 -0.739 -1.651 -1.651 v -5.483 c 0 -0.912 0.739 -1.651 1.651 -1.651 h 6.483 c 0.912 0 1.651 0.739 1.651 1.651 v 5.483 C 23.163 70.136 22.424 70.875 21.512 70.875 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(216,10,0)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 39.332 70.875 h -6.483 c -0.912 0 -1.651 -0.739 -1.651 -1.651 V 58.741 c 0 -0.912 0.739 -1.651 1.651 -1.651 h 6.483 c 0.912 0 1.651 0.739 1.651 1.651 v 10.483 C 40.983 70.136 40.244 70.875 39.332 70.875 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(216,92,0)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 57.151 70.875 h -6.483 c -0.912 0 -1.651 -0.739 -1.651 -1.651 V 46.741 c 0 -0.912 0.739 -1.651 1.651 -1.651 h 6.483 c 0.912 0 1.651 0.739 1.651 1.651 v 22.483 C 58.803 70.136 58.063 70.875 57.151 70.875 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(209,184,0)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 74.971 70.875 h -6.483 c -0.912 0 -1.651 -0.739 -1.651 -1.651 V 34.741 c 0 -0.912 0.739 -1.651 1.651 -1.651 h 6.483 c 0.912 0 1.651 0.739 1.651 1.651 v 34.483 C 76.622 70.136 75.883 70.875 74.971 70.875 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(100,204,0)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 21.512 71.875 h -6.483 c -1.462 0 -2.651 -1.189 -2.651 -2.651 v -5.482 c 0 -1.462 1.189 -2.651 2.651 -2.651 h 6.483 c 1.462 0 2.651 1.189 2.651 2.651 v 5.482 C 24.163 70.686 22.974 71.875 21.512 71.875 z M 15.029 63.09 c -0.359 0 -0.651 0.292 -0.651 0.651 v 5.482 c 0 0.359 0.292 0.651 0.651 0.651 h 6.483 c 0.359 0 0.651 -0.292 0.651 -0.651 v -5.482 c 0 -0.359 -0.292 -0.651 -0.651 -0.651 H 15.029 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 39.332 71.875 h -6.483 c -1.462 0 -2.651 -1.189 -2.651 -2.651 V 58.741 c 0 -1.462 1.189 -2.651 2.651 -2.651 h 6.483 c 1.462 0 2.651 1.189 2.651 2.651 v 10.482 C 41.983 70.686 40.793 71.875 39.332 71.875 z M 32.849 58.09 c -0.359 0 -0.651 0.292 -0.651 0.651 v 10.482 c 0 0.359 0.292 0.651 0.651 0.651 h 6.483 c 0.359 0 0.651 -0.292 0.651 -0.651 V 58.741 c 0 -0.359 -0.292 -0.651 -0.651 -0.651 H 32.849 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 57.151 71.875 h -6.483 c -1.462 0 -2.651 -1.189 -2.651 -2.651 V 46.741 c 0 -1.462 1.189 -2.651 2.651 -2.651 h 6.483 c 1.462 0 2.651 1.189 2.651 2.651 v 22.482 C 59.803 70.686 58.613 71.875 57.151 71.875 z M 50.668 46.09 c -0.359 0 -0.651 0.292 -0.651 0.651 v 22.482 c 0 0.359 0.292 0.651 0.651 0.651 h 6.483 c 0.359 0 0.651 -0.292 0.651 -0.651 V 46.741 c 0 -0.359 -0.292 -0.651 -0.651 -0.651 H 50.668 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 74.971 71.875 h -6.482 c -1.462 0 -2.651 -1.189 -2.651 -2.651 V 34.741 c 0 -1.462 1.189 -2.651 2.651 -2.651 h 6.482 c 1.462 0 2.651 1.189 2.651 2.651 v 34.482 C 77.622 70.686 76.433 71.875 74.971 71.875 z M 68.488 34.09 c -0.359 0 -0.651 0.292 -0.651 0.651 v 34.482 c 0 0.359 0.292 0.651 0.651 0.651 h 6.482 c 0.359 0 0.651 -0.292 0.651 -0.651 V 34.741 c 0 -0.359 -0.292 -0.651 -0.651 -0.651 H 68.488 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,47,78)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
        </g>
      </svg>
    </Link>
  );
};

// const Dashboard = () => {
//   const cachedTheme = useThemeState();
//   return (
//     <div className="flex flex-1">
//       <div
//         className={cn(
//           cachedTheme?.bg,
//           cachedTheme?.borderColor,
//           'p-2 md:p-10 border flex flex-col gap-2 flex-1 w-full h-full'
//           //   'p-2 md:p-10 border bg-white dark:bg-green-200 flex flex-col gap-2 flex-1 w-full h-full'
//         )}
//       >
//         <div className="flex gap-2">
//           {[...new Array(4)].map((i, index) => (
//             <div
//               key={'first-array' + index}
//               className={cn(
//                 cachedTheme?.activeBg,
//                 'h-20 w-full rounded-lg animate-pulse'
//               )}
//             ></div>
//           ))}
//         </div>
//         <div className="flex gap-2 flex-1">
//           {[...new Array(2)].map((i, index) => (
//             <div
//               key={'second-array' + index}
//               className={cn(
//                 cachedTheme?.activeBg,
//                 'h-full w-full rounded-lg animate-pulse'
//               )}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
