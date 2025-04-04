'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { cn } from '@/app/lib/utils/tailwindMerge';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';
import { permissions } from '@/app/lib/scalableComponents';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const ListNavigation = () => {
  const cachedTheme = useThemeState();
  const { isMobile } = useBreakpoint();
  const { data: session } = useSession();

  if (!isMobile) {
    return null;
  }
  return (
    <div
      className={cn(
        cachedTheme?.activeBg,
        cachedTheme?.activeTextColor,
        'cursor-pointer fixed top-0 right-0 m-1 p-1 rounded-3xl shadow-md group z-10'
      )}
    >
      List Property
      {!session ? (
        <Link
          href={'/auth/login'}
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.textColor,
            cachedTheme?.borderColor,
            'absolute left-1/2 top-full mt-[1px] w-[6.6rem] p-1 -translate-x-1/2 scale-0 rounded-xl text-base text-center border transition-all group-hover:scale-100'
          )}
        >
          Login
        </Link>
      ) : (
        <p
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.textColor,
            cachedTheme?.borderColor,
            'absolute left-1/2 top-full mt-[1px] w-[6.6rem] -translate-x-1/2 scale-0 text-base transition-all group-hover:scale-100 border rounded-xl'
          )}
        >
          {permissions.map((route, index, list) => {
            const isPermitted = session?.user?.permission?.includes(route);
            const formattedRoute =
              route.charAt(0).toUpperCase() + route.slice(1);
            return (
              <Link
                key={route}
                href={isPermitted ? `/list/${route}` : '/upgrade'}
                className={cn(
                  cachedTheme?.borderColor,
                  'block w-full p-1 rounded-xl',
                  !isPermitted && [
                    cachedTheme?.activeListHover,
                    cachedTheme?.activeListHoverText,
                  ],
                  index !== list.length - 1 && 'border-b-2'
                )}
                onMouseEnter={(e) =>
                  !isPermitted && (e.currentTarget.textContent = 'Upgrade')
                }
                onMouseLeave={(e) =>
                  !isPermitted && (e.currentTarget.textContent = formattedRoute)
                }
              >
                {formattedRoute}
              </Link>
            );
          })}
        </p>
      )}
    </div>
  );
};

export default ListNavigation;
