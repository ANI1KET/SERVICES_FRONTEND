'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from '@/app/lib/ui/SidebarComponent';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { DashboardPermissionTabs } from '@/app/lib/utils/tabs';
import { Logo, LogoIcon } from '../SideNavigationBar/SideNavBar';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
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
            'border justify-between gap-10 max-sm:rounded-r-none'
          )}
        >
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? (
              <Logo
                title={'DASHBOARD'}
                url={`/dashboard/${session?.user.role?.toLowerCase()}`}
              />
            ) : (
              <LogoIcon
                url={`/dashboard/${session?.user.role?.toLowerCase()}`}
              />
            )}
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
    </div>
  );
};

export default LayoutComponent;
