'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Permission } from '@prisma/client';
import { useSession } from 'next-auth/react';

import { cn } from '../lib/utils/tailwindMerge';
import { permissions } from '../lib/scalableComponents';
import { DashboardPermissionTabs } from '../lib/utils/tabs';
import { useThemeState } from '../providers/reactqueryProvider';
import { Sidebar, SidebarBody, SidebarLink } from '../lib/ui/SidebarComponent';

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
            <div className="flex flex-col gap-2">
              {permissions.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    href: `/interested/${link}`,
                    icon: DashboardPermissionTabs[link as Permission],
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
