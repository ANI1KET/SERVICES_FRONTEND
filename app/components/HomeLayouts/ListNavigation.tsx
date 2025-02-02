'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import useBreakpoint from '@/app/lib/utils/useBreakpoint';

const ListNavigation = () => {
  const { isMobile } = useBreakpoint();
  const { data: session } = useSession();

  if (!isMobile) {
    return null;
  }
  return (
    <div className="cursor-pointer fixed top-0 right-0 m-1 p-1 rounded-3xl bg-black text-white shadow-md group">
      List Property
      {session?.user.role === 'USER' ? (
        <Link
          href={'/upgrade'}
          className="absolute left-1/2 top-full mt-[1px] w-24 p-1 -translate-x-1/2 scale-0 rounded-xl bg-black text-base text-white transition-all group-hover:scale-100 border border-black"
        >
          Upgrade to list property
        </Link>
      ) : (
        (session?.user.permission ?? []).length > 0 && (
          <p className="absolute left-1/2 top-full mt-[1px] w-24 -translate-x-1/2 scale-0 bg-black text-base text-white transition-all group-hover:scale-100 border border-black rounded-xl">
            {(session?.user.permission ?? []).map((route, index, list) => (
              <Link
                key={route}
                href={`/list/${route}`}
                className={`block w-full p-1 border-black rounded-b-md hover:text-lg ${
                  index !== list.length - 1 ? 'border-b-2' : ''
                }`}
              >
                {route}
              </Link>
            ))}
          </p>
        )
      )}
      {!session && (
        <Link
          href={'/auth/login'}
          className="absolute left-1/2 top-full mt-[1px] w-24 p-1 -translate-x-1/2 scale-0 rounded-xl bg-black text-base text-white text-center transition-all group-hover:scale-100 border border-black"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default ListNavigation;
