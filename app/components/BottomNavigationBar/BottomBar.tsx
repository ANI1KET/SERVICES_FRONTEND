'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import {
  useTabState,
  useThemeState,
  useSetTabState,
} from '@/app/providers/reactqueryProvider';
import { cn } from '@/app/lib/utils/tailwindMerge';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';
import { canAccessDashboard } from '@/app/lib/scalableComponents';
import { RentIcon, ProfileIcon, FurnishIcon } from '@/app/lib/icon/svg';

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
          Room
        </div>
        <div
          className={cn(
            tabState?.['BottomTabs'] === 'student' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('student')}
        >
          <svg
            width={34}
            height={34}
            xmlSpace="preserve"
            viewBox="0 0 504 504"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="252" cy="252" r="252" fill="#FFD05B"></circle>
            <g fill="#E6E9EE">
              <path d="M116.9 163.2h270.2v18H116.9zM116.9 253.8h270.2v18H116.9zM116.9 344.5h270.2v18H116.9z"></path>
            </g>
            <g fill="#FFF">
              <path d="M371.1 113.5h24.1v277h-24.1zM108.8 113.5h24.1v277h-24.1z"></path>
            </g>
            <g fill="#324A5E">
              <circle cx="160.5" cy="134.4" r="14.4"></circle>
              <path d="M352.1 185.8H190v-72.3l162.1 19.7z"></path>
              <circle cx="160.5" cy="229.6" r="14.4"></circle>
            </g>
            <path fill="#4CDBC4" d="M352.1 281H190v-72.3l162.1 19.7z"></path>
            <circle cx="160.5" cy="324.8" r="14.4" fill="#324A5E"></circle>
            <path fill="#FF7058" d="M352.1 376.2H190v-72.3l162.1 19.7z"></path>
          </svg>
          Hostel
        </div>
        <div
          className={cn(
            tabState?.['BottomTabs'] === 'buyer' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('buyer')}
        >
          <svg
            width={34}
            height={34}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g data-name="16-city">
              <path
                d="M58 20a7.987 7.987 0 0 1-5.32 7.53L50 32l-2.68-4.47A8 8 0 1 1 58 20zm-5 0a3 3 0 1 0-3 3 3 3 0 0 0 3-3z"
                fill="#ff936b"
              />
              <path
                d="M32 14a12.992 12.992 0 0 1-9.58 12.53L19 32l-3.42-5.47A12.995 12.995 0 1 1 32 14zm-8 0a5 5 0 1 0-5 5 5 5 0 0 0 5-5z"
                fill="#65b1fc"
              />
              <path
                fill="#e3b79d"
                d="M13 46v5l-5-2-5 2v-5l5-2 5 2zM13 54v5H3v-5l5-2 5 2z"
              />
              <path fill="#ff7045" d="M13 51v3l-5-2-5 2v-3l5-2 5 2z" />
              <path
                fill="#ff936b"
                d="M13 43v3l-5-2-5 2v-3l5-2 5 2zM23 54l-5-2-5 2v-3l5-2 5 2v3z"
              />
              <path fill="#f7f7f7" d="M61 47v12H49V47h12z" />
              <path fill="#cfcfcf" d="M52 47v12h-3V47h3z" />
              <path fill="#9c9c9c" d="M61 43v4H49v-4h12z" />
              <path
                fill="#b2876d"
                d="M23 54v5H13v-5l5-2 5 2zM49 54v5H39v-5l5-2 5 2z"
              />
              <path
                fill="#65b1fc"
                d="M28 49v4h-5v-4h5zM39 51v2h-5v-4h5v2zM28 45h6v4h-6zM34 41h5v4h-5zM23 41h5v4h-5zM28 37h6v4h-6z"
              />
              <path
                fill="#a3d4ff"
                d="M28 49h6v4h-6zM34 45h5v4h-5zM23 45h5v4h-5zM28 41h6v4h-6zM34 37h5v4h-5zM23 37h5v4h-5z"
              />
              <path fill="#f7f7f7" d="M39 33v4H23v-4h16zM39 54v5H23v-6h16v1z" />
              <path fill="#966857" d="M63 59v4H1v-4h62z" />
              <path d="M63 58h-1V43a1 1 0 0 0-1-1h-1v-2h-2v2h-2v-5h-2v5h-5a1 1 0 0 0-1 1v6.523l-3.629-1.452a1 1 0 0 0-.742 0L40 49.523V33a1 1 0 0 0-1-1H23a1 1 0 0 0-1 1v16.523l-3.629-1.452a1 1 0 0 0-.742 0L14 49.523V39h-2v2.523l-3-1.2V37H7v3.323l-4.371 1.748A1 1 0 0 0 2 43v15H1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h62a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1zM38 48h-3v-2h3zm0 3v1h-3v-2h3zm-14-9h3v2h-3zm5 0h4v2h-4zm-5 4h3v2h-3zm5 0h4v2h-4zm4 4v2h-4v-2zm5-6h-3v-2h3zm0-4h-3v-2h3zm-5 0h-4v-2h4zm-6 0h-3v-2h3zm-3 11v-1h3v2h-3zm16 3.677 4-1.6 4 1.6V58h-8zM50 51v-3h10v10H50zm10-7v2H50v-2zm-16 6.077 4 1.6v.846l-3.629-1.452a1 1 0 0 0-.742 0L40 52.523v-.846zM24 34h14v2H24zm-6 16.077 4 1.6v.846l-3.629-1.452a1 1 0 0 0-.742 0L14 52.523v-.846zm-10-8 4 1.6v.846l-3.629-1.452a1 1 0 0 0-.742 0L4 44.523v-.846zM62 62H2v-2h60zM19 20a6 6 0 1 0-6-6 6.006 6.006 0 0 0 6 6zm0-10a4 4 0 1 1-4 4 4 4 0 0 1 4-4zM46.638 28.341l2.505 4.174a1 1 0 0 0 1.714 0l2.505-4.174a9 9 0 1 0-6.724 0zM50 13a7 7 0 0 1 2.347 13.587 1 1 0 0 0-.522.428L50 30.057l-1.825-3.042a1 1 0 0 0-.522-.428A7 7 0 0 1 50 13z" />
              <path d="M50 24a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2zM14.937 27.386l3.215 5.144a1 1 0 0 0 1.7 0l3.214-5.144a14 14 0 1 0-8.125 0zM19 2a11.993 11.993 0 0 1 3.155 23.566 1 1 0 0 0-.585.434L19 30.113 16.43 26a1 1 0 0 0-.585-.435A11.993 11.993 0 0 1 19 2z" />
            </g>
          </svg>
          Property
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
            tabState?.['BottomTabs'] === 'shopper' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('shopper')}
        >
          <FurnishIcon size={34} />
          Shop
        </div>
        <div
          className={cn(
            tabState?.['BottomTabs'] === 'autobuyer' &&
              `${cachedTheme?.bottomBarActiveTextColor} scale-105`,
            'cursor-pointer text-center text-xs lg:text-base rounded-3xl transition-all duration-200'
          )}
          onClick={() => handleTabClick('autobuyer')}
        >
          <svg
            width={34}
            height={34}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 340 340"
          >
            <path
              d="M34.087 293.895h48.969v21.614a13.2 13.2 0 0 1-13.2 13.2H47.289a13.2 13.2 0 0 1-13.2-13.2v-21.614h-.002z"
              style={{
                fill: '#6f6f7f',
              }}
            />
            <path
              d="M50.8 204.907s-18.672.7-32.307-2.164a11.285 11.285 0 0 1-8.9-11.074v-4.2a11.345 11.345 0 0 1 4.627-9.144 42.886 42.886 0 0 1 11.324-5.761 10.61 10.61 0 0 1 14.031 9.092c.118 1.287.209 2.651.261 4.078a7.16 7.16 0 0 0 5.813 6.784 45.2 45.2 0 0 0 8.434.777z"
              style={{
                fill: '#e05f5f',
              }}
            />
            <path
              d="M223.6 293.895h22.56a13.2 13.2 0 0 1 13.2 13.2v21.614h-48.967V307.1a13.2 13.2 0 0 1 13.207-13.205z"
              transform="rotate(180 234.877 311.303)"
              style={{
                fill: '#6f6f7f',
              }}
            />
            <path
              d="M242.646 204.907s18.672.7 32.307-2.164a11.285 11.285 0 0 0 8.9-11.074v-4.2a11.342 11.342 0 0 0-4.627-9.144 42.886 42.886 0 0 0-11.324-5.761 10.61 10.61 0 0 0-14.031 9.092 74.374 74.374 0 0 0-.261 4.078 7.16 7.16 0 0 1-5.813 6.784 45.2 45.2 0 0 1-8.434.777z"
              style={{
                fill: '#e05f5f',
              }}
            />
            <path
              d="m262.789 219.369-10.237-10.632a18.371 18.371 0 0 1-3.386-4.9c-4.218-8.924-18.275-37.9-30.817-54.906a19.984 19.984 0 0 0-9.217-6.874c-10.5-3.856-34.768-11.491-62.407-11.491s-51.91 7.635-62.408 11.491a19.989 19.989 0 0 0-9.217 6.874c-12.542 17.009-26.6 45.982-30.817 54.906a18.39 18.39 0 0 1-3.385 4.9L30.66 219.369a30.531 30.531 0 0 0-8.539 21.177v40.827A16.741 16.741 0 0 0 35 297.708c39.223 9.124 111.724 6.9 111.724 6.9s72.5 2.226 111.723-6.9a16.741 16.741 0 0 0 12.88-16.335v-40.827a30.531 30.531 0 0 0-8.538-21.177z"
              style={{
                fill: '#ff8585',
              }}
            />
            <path
              d="M37.146 242.651v8.988a10.883 10.883 0 0 0 6.867 10.195 51.809 51.809 0 0 0 15.611 3.2 9.985 9.985 0 0 0 7.831-3.131 32.547 32.547 0 0 1 11.74-7.685 8.277 8.277 0 0 0 5.228-7.7v-5.9a268.633 268.633 0 0 1-35.292-7.773 8.172 8.172 0 0 0-8.025 1.9 15.425 15.425 0 0 0-3.207 4.455 7.954 7.954 0 0 0-.753 3.451z"
              style={{
                fill: '#fff',
              }}
            />
            <path
              d="M186.181 243.46c-11.707 1.128-67.206 1.128-78.913 0a6.3 6.3 0 0 0-6.9 6.283 13.567 13.567 0 0 0 2.12 7.3 64.46 64.46 0 0 0 2.68 3.891 23.609 23.609 0 0 0 15.6 9.178c5.93.853 45.989.853 51.919 0a23.609 23.609 0 0 0 15.6-9.178 62.776 62.776 0 0 0 2.68-3.891 13.567 13.567 0 0 0 2.12-7.3 6.3 6.3 0 0 0-6.906-6.283z"
              style={{
                fill: '#e05f5f',
              }}
            />
            <path
              d="M256.3 242.651v8.988a10.883 10.883 0 0 1-6.867 10.195 51.8 51.8 0 0 1-15.61 3.2 9.986 9.986 0 0 1-7.832-3.131 32.553 32.553 0 0 0-11.739-7.685 8.276 8.276 0 0 1-5.229-7.7v-5.9a268.551 268.551 0 0 0 35.292-7.773 8.172 8.172 0 0 1 8.025 1.9 15.425 15.425 0 0 1 3.207 4.455 7.954 7.954 0 0 1 .753 3.451z"
              style={{
                fill: '#fff',
              }}
            />
            <path
              d="M188.589 296.034a20.236 20.236 0 0 0-14.9-6.539h-53.934a20.236 20.236 0 0 0-14.895 6.539l-7.618 8.287c26.83.979 49.483.285 49.483.285s22.652.694 49.482-.285zM208.514 160.172a15.428 15.428 0 0 0-8.814-6.208c-10-2.647-32.236-7.83-52.975-7.83s-42.974 5.183-52.976 7.83a15.428 15.428 0 0 0-8.814 6.208c-9.6 14.08-16.71 31.365-19.416 38.406a2.145 2.145 0 0 0 2.184 2.906c35.186-3.052 79.022-2.454 79.022-2.454s43.835-.6 79.021 2.454a2.145 2.145 0 0 0 2.184-2.906c-2.706-7.041-9.819-24.326-19.416-38.406z"
              style={{
                fill: '#6f6f7f',
              }}
            />
            <path
              d="M268.179 11.28c-18.821 17.87-62.221 9.756-62.221 9.756v63.316a59.516 59.516 0 0 0 4.028 21.915c15.633 39.509 58.193 47.426 58.193 47.426s42.56-7.917 58.194-47.426a59.536 59.536 0 0 0 4.027-21.915V21.036S287 29.15 268.179 11.28z"
              style={{
                fill: '#ffdc6c',
              }}
            />
            <path
              d="M268.179 11.28a34.606 34.606 0 0 1-10.379 6.61l-51.842 51.842v14.62a61.12 61.12 0 0 0 2.283 16.758L288.4 20.954c-7.679-1.673-14.923-4.644-20.221-9.674zM215.515 117.351a72 72 0 0 0 7.649 10.307L324.406 26.765V21.9c-3.349.4-7.874.806-12.988.933z"
              style={{
                fill: '#ffedd2',
              }}
            />
            <path
              d="M326.373 106.267a59.536 59.536 0 0 0 4.027-21.915V21.036S287 29.15 268.179 11.28v142.413s42.56-7.917 58.194-47.426z"
              style={{
                fill: '#fca742',
              }}
            />
            <path
              d="M205.958 54.972 238.535 22.4c-2.568.247-5.115.386-7.589.445l-24.988 24.982z"
              style={{
                fill: '#ffedd2',
              }}
            />
            <path
              d="m35.355 208.726-7.576 7.874a34.361 34.361 0 0 0-9.658 23.951v40.827a20.653 20.653 0 0 0 11.966 18.838v15.3a17.222 17.222 0 0 0 17.2 17.2h22.567a17.222 17.222 0 0 0 17.2-17.2v-7.619c21.4 1.1 41.771 1.032 53.117.854 4.443-.067 8.889-.056 13.213.042 4.76.107 11.366.218 18.375.218 8.492 0 17.575-.162 24.667-.69q5.121-.187 9.965-.437v7.632a17.222 17.222 0 0 0 17.2 17.2h22.569a17.222 17.222 0 0 0 17.2-17.2v-15.3a20.656 20.656 0 0 0 11.966-18.837v-40.833a34.361 34.361 0 0 0-9.656-23.946l-7.576-7.869a118.51 118.51 0 0 0 17.681-2.068 15.338 15.338 0 0 0 12.074-14.989v-4.2a15.409 15.409 0 0 0-6.257-12.367 47.1 47.1 0 0 0-12.373-6.313 14.61 14.61 0 0 0-19.336 12.5 79.384 79.384 0 0 0-.274 4.3 4 4 0 0 0 7.995.289c.046-1.28.129-2.579.246-3.86a6.623 6.623 0 0 1 3.031-5 6.5 6.5 0 0 1 5.7-.68 39.13 39.13 0 0 1 10.274 5.208 7.375 7.375 0 0 1 3 5.921v4.2a7.3 7.3 0 0 1-5.719 7.16 126.754 126.754 0 0 1-21.912 2.106c-4.712-9.9-18.385-37.749-30.65-54.38a23.921 23.921 0 0 0-11.056-8.255c-11.929-4.383-36.078-11.737-63.787-11.737s-51.865 7.351-63.793 11.734a23.918 23.918 0 0 0-11.057 8.254c-12.264 16.63-25.938 44.486-30.649 54.381a126.682 126.682 0 0 1-21.914-2.107 7.3 7.3 0 0 1-5.718-7.159v-4.2a7.375 7.375 0 0 1 3-5.921 39.137 39.137 0 0 1 10.275-5.208 6.5 6.5 0 0 1 5.7.68 6.622 6.622 0 0 1 3.031 5c.117 1.291.2 2.59.246 3.862a4 4 0 0 0 8-.289 78.78 78.78 0 0 0-.274-4.3 14.61 14.61 0 0 0-19.336-12.5 47.118 47.118 0 0 0-12.385 6.307A15.409 15.409 0 0 0 5.6 187.466v4.2a15.336 15.336 0 0 0 12.073 14.988 118.409 118.409 0 0 0 17.682 2.072zm43.7 106.784a9.212 9.212 0 0 1-9.2 9.2H47.29a9.213 9.213 0 0 1-9.2-9.2v-13.044c12.057 2.46 26.514 4 40.969 4.955zm74.51-14.721c-2.579-.059-5.2-.087-7.837-.087q-2.834 0-5.682.045c-6.452.1-19.061.2-33.927-.173l1.685-1.833a16.276 16.276 0 0 1 11.95-5.246h53.939a16.275 16.275 0 0 1 11.95 5.246l1.863 2.026c-11.706.404-25.652.209-33.94.022zm92.594 23.923H223.6a9.213 9.213 0 0 1-9.2-9.2v-8.1c16.393-1.071 30.108-2.726 40.969-4.942v13.04a9.212 9.212 0 0 1-9.209 9.202zM78.32 151.3a15.943 15.943 0 0 1 7.377-5.493c9.2-3.381 33.567-11.246 61.028-11.246s51.825 7.865 61.028 11.246a15.941 15.941 0 0 1 7.376 5.494c12.366 16.767 26.411 45.755 30.421 54.242a22.36 22.36 0 0 0 4.12 5.967l10.238 10.631a26.4 26.4 0 0 1 7.42 18.4v40.827a12.676 12.676 0 0 1-9.795 12.44c-14.1 3.28-34.168 5.442-59.635 6.438l-6.365-6.924a24.293 24.293 0 0 0-17.839-7.832h-53.939a24.294 24.294 0 0 0-17.839 7.832l-6.352 6.909c-20.441-.8-43.193-2.594-59.656-6.424a12.673 12.673 0 0 1-9.787-12.439v-40.822a26.4 26.4 0 0 1 7.421-18.4l10.236-10.63a22.384 22.384 0 0 0 4.122-5.969c4.01-8.489 18.055-37.479 30.42-54.247z"
              style={{
                fill: '#494456',
              }}
            />
            <path
              d="M34.291 237.486a11.859 11.859 0 0 0-1.145 5.164v8.989a14.95 14.95 0 0 0 9.43 13.928 56.005 56.005 0 0 0 16.837 3.465c.252.014.5.021.754.021a13.927 13.927 0 0 0 10.213-4.417 28.73 28.73 0 0 1 10.288-6.7 12.215 12.215 0 0 0 7.755-11.417v-5.894a4 4 0 0 0-3.376-3.951 264.364 264.364 0 0 1-34.754-7.649 12.178 12.178 0 0 0-11.955 2.841 19.529 19.529 0 0 0-4.047 5.62zm6.855 5.164a3.989 3.989 0 0 1 .362-1.712 11.483 11.483 0 0 1 2.367-3.295 4.14 4.14 0 0 1 2.866-1.142 4.265 4.265 0 0 1 1.229.182 265.314 265.314 0 0 0 32.453 7.346v2.494a4.258 4.258 0 0 1-2.7 3.98 36.738 36.738 0 0 0-13.19 8.676 5.971 5.971 0 0 1-4.695 1.865A47.953 47.953 0 0 1 45.45 258.1a6.9 6.9 0 0 1-4.3-6.461zM185.8 239.478c-11.319 1.09-66.824 1.09-78.146 0a10.3 10.3 0 0 0-11.286 10.265 17.551 17.551 0 0 0 2.745 9.443 68.24 68.24 0 0 0 2.849 4.135 27.785 27.785 0 0 0 18.238 10.745c3.1.447 14.813.669 26.529.669s23.429-.222 26.527-.669a27.785 27.785 0 0 0 18.238-10.745 68.457 68.457 0 0 0 2.849-4.136 17.55 17.55 0 0 0 2.745-9.442 10.3 10.3 0 0 0-11.288-10.265zm1.793 15.41a60.079 60.079 0 0 1-2.513 3.65 19.736 19.736 0 0 1-12.964 7.61c-5.457.783-45.322.783-50.78 0a19.732 19.732 0 0 1-12.962-7.61 60.174 60.174 0 0 1-2.513-3.649 9.563 9.563 0 0 1-1.494-5.146 2.3 2.3 0 0 1 2.52-2.3c11.915 1.149 67.764 1.149 79.679 0a2.3 2.3 0 0 1 2.52 2.3 9.567 9.567 0 0 1-1.495 5.145zM205.026 240.629v5.894a12.216 12.216 0 0 0 7.754 11.417 28.73 28.73 0 0 1 10.289 6.7 13.927 13.927 0 0 0 10.213 4.417q.376 0 .755-.021a56.005 56.005 0 0 0 16.836-3.465 14.95 14.95 0 0 0 9.43-13.928v-8.993a11.866 11.866 0 0 0-1.144-5.164 19.555 19.555 0 0 0-4.048-5.617 12.18 12.18 0 0 0-11.955-2.84 264.242 264.242 0 0 1-34.754 7.649 4 4 0 0 0-3.376 3.951zm8 3.4a265.172 265.172 0 0 0 32.453-7.346 4.177 4.177 0 0 1 4.095.96 11.5 11.5 0 0 1 2.368 3.3 3.992 3.992 0 0 1 .361 1.711v8.989A6.9 6.9 0 0 1 248 258.1a47.954 47.954 0 0 1-14.384 2.944 5.976 5.976 0 0 1-4.7-1.865 36.738 36.738 0 0 0-13.19-8.676 4.258 4.258 0 0 1-2.7-3.98zM207.663 200.23a4 4 0 0 0-3.806-4.185l-1.419-.068a4 4 0 0 0-.365 7.993l1.4.065h.193a4 4 0 0 0 3.997-3.805z"
              style={{
                fill: '#494456',
              }}
            />
            <path
              d="M64.7 205.773c35.057-3.339 81.505-2.752 81.968-2.744h.109c.175 0 17.639-.229 39.027.352h.111a4 4 0 0 0 .106-8c-20.963-.573-38.2-.37-39.3-.356-1.75-.023-42.478-.486-76.384 2.222 3.208-8 9.64-22.709 17.9-34.821a11.441 11.441 0 0 1 6.541-4.6c8.744-2.315 31.31-7.7 51.947-7.7s43.2 5.381 51.947 7.7a11.445 11.445 0 0 1 6.54 4.6c8.244 12.1 14.682 26.818 17.893 34.82q-2.215-.177-4.514-.341a4 4 0 0 0-.566 7.98c3.753.266 7.36.564 10.722.884.127.012.253.018.379.018a4 4 0 0 0 3.774-5.325c-.343-.979-8.558-24.174-21.078-42.542a19.444 19.444 0 0 0-11.1-7.828c-11.237-2.974-33.194-7.962-53.993-7.962s-42.757 4.988-53.994 7.962a19.446 19.446 0 0 0-11.1 7.828c-12.52 18.368-20.735 41.563-21.078 42.542a4 4 0 0 0 4.153 5.307zM329.665 17.1c-.415.077-41.591 7.55-58.731-8.724-.075-.071-.16-.12-.238-.184a3.821 3.821 0 0 0-.323-.25 3.681 3.681 0 0 0-.34-.191 3.847 3.847 0 0 0-.353-.174 3.7 3.7 0 0 0-.365-.119c-.125-.037-.249-.076-.376-.1s-.245-.033-.369-.045-.263-.028-.4-.028-.239.014-.358.025a3.967 3.967 0 0 0-.407.05c-.116.023-.229.059-.343.092a3.934 3.934 0 0 0-.394.128c-.115.047-.223.107-.334.165a2.692 2.692 0 0 0-.674.446c-.078.064-.164.114-.239.186-17.109 16.244-58.318 8.8-58.733 8.723a4 4 0 0 0-4.734 3.933v63.318a63.281 63.281 0 0 0 4.308 23.387c16.26 41.094 59.355 49.548 61.182 49.888h.007a3.993 3.993 0 0 0 .72.067h.009a3.988 3.988 0 0 0 .718-.067h.009c1.826-.34 44.921-8.794 61.181-49.888a63.269 63.269 0 0 0 4.312-23.387V21.036a4 4 0 0 0-4.735-3.932zM326.4 84.351a55.321 55.321 0 0 1-3.747 20.444c-13.509 34.141-48.926 43.531-54.474 44.806-5.548-1.275-40.965-10.665-54.474-44.806a55.314 55.314 0 0 1-3.747-20.444V25.7c11.54 1.519 41.15 3.823 58.221-9.191C285.25 29.518 314.862 27.214 326.4 25.7z"
              style={{
                fill: '#494456',
              }}
            />
          </svg>
          Vehicle
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
                  {canAccessDashboard(session.user.role, 'dashboard') && (
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
                  <li
                    className={cn(
                      cachedTheme?.borderColor,
                      'p-2 cursor-pointer border-t-2 rounded-lg'
                    )}
                    onClick={() => router.push('/profile')}
                  >
                    Profile
                  </li>
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
                  cachedTheme?.hoverBg,
                  cachedTheme?.borderColor,
                  'p-2 rounded-lg cursor-pointer border-t-2 '
                )}
                onClick={() => {
                  router.push('/interested');
                }}
              >
                Interested
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
