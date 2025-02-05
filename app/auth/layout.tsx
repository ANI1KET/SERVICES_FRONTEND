'use client';

// import type { Metadata } from 'next';
import Link from 'next/link';

import { cn } from '../lib/utils/tailwindMerge';
import { useThemeState } from '../providers/reactqueryProvider';

// export const metadata: Metadata = {
//   title: 'ROOM RENTAL',
//   description: 'TO RENT ROOM',
//   keywords: ['rent', 'room', 'accommodation'],
// };

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cachedTheme = useThemeState();

  return (
    <section className="relative ">
      <div
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          'relative w-[71vw] ml-[11.5vw] mr-[18.5vw] flex border-2 rounded-xl max-sm:top-2 max-sm:w-2/3 max-sm:mx-auto'
        )}
      >
        <Link
          href="/auth/login"
          className="w-full flex justify-center p-2 hover:scale-110"
        >
          Login
        </Link>
        <div className="border-l"></div>
        <Link
          href="/auth/signup"
          className="w-full flex justify-center p-2 hover:scale-110"
        >
          Signup
        </Link>
      </div>
      {children}
    </section>
  );
}
