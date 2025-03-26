'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { cn } from '@/app/lib/utils/tailwindMerge';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';
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
            'absolute left-1/2 top-full mt-[1px] w-24 p-1 -translate-x-1/2 scale-0 rounded-xl text-base text-center border transition-all group-hover:scale-100'
          )}
        >
          Login
        </Link>
      ) : session?.user.role === 'USER' ? (
        <Link
          href={'/upgrade'}
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.textColor,
            cachedTheme?.borderColor,
            'absolute left-1/2 top-full mt-[1px] w-24 p-1 -translate-x-1/2 scale-0 rounded-xl text-base transition-all group-hover:scale-100 border '
          )}
        >
          Upgrade to list property
        </Link>
      ) : (
        (session?.user.permission ?? []).length > 0 && (
          <p
            className={cn(
              cachedTheme?.bg,
              cachedTheme?.textColor,
              cachedTheme?.borderColor,
              'absolute left-1/2 top-full mt-[1px] w-24 -translate-x-1/2 scale-0 text-base transition-all group-hover:scale-100 border rounded-xl'
            )}
          >
            {(session?.user.permission ?? []).map((route, index, list) => (
              <Link
                key={route}
                href={`/list/${route}`}
                className={cn(
                  cachedTheme?.borderColor,
                  index !== list.length - 1 && 'border-b-2',
                  'block w-full p-1 rounded-b-md hover:text-lg'
                )}
              >
                {route}
              </Link>
            ))}
          </p>
        )
      )}
    </div>
  );
};

export default ListNavigation;
