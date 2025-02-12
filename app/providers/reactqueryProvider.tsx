'use client';

import { useState } from 'react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { NewListedRoom } from '../types/types';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export interface TabState {
  [key: string]: string;
}

export interface ThemeState {
  bg: string;
  activeBg: string;
  textColor: string;
  activeTextColor: string;
  borderColor: string;
  svgIconColor: string;
  // Input
  inputBg: string;
  inputColor: string;
  //
  hoverBg: string;
  peerCheckedBg: string;
  peerCheckedText: string;
  // MUI
  selectIcon: string;
  selectMenuBg: string;
  selectMenuTextColor: string;
  selectMenuHoverFocused: string;
  bottomBarActiveTextColor: string;
  sliderRailColor: string;
}

const initialTabState: TabState = {
  CategoryTab: 'room',
};

const initialThemeState = {
  bg: 'bg-green-300',
  textColor: 'text-black',
  activeBg: 'bg-neutral-900',
  activeTextColor: 'text-green-200',
  svgIconColor: 'black',
  borderColor: 'border-black',
  bottomBarActiveTextColor: 'black',
  // Input
  inputBg: 'bg-green-100',
  inputColor: 'text-black',
  //
  hoverBg: 'hover:bg-green-200',
  peerCheckedBg: 'peer-checked:bg-black',
  peerCheckedText: 'peer-checked:text-green-300',
  // MUI
  selectIcon: 'black',
  selectMenuBg: '#86EFAC',
  sliderRailColor: 'black',
  selectMenuTextColor: 'black',
  selectMenuHoverFocused: '#e7fce9',
};

// const initialThemeState = {
//   bg: 'bg-neutral-900',
//   textColor: 'text-green-200',
//   activeBg: 'bg-green-300',
//   activeTextColor: 'text-black',
//   svgIconColor: 'lightgreen',
//   borderColor: 'border-green-200',
//   bottomBarActiveTextColor: 'text-green-400',
//   // Input
//   inputBg: 'bg-green-300',
//   inputColor: 'text-black',
//   //
//   hoverBg: 'hover:bg-neutral-800',
//   peerCheckedBg: 'peer-checked:bg-green-300',
//   peerCheckedText: 'peer-checked:text-black',
//   // MUI
//   selectMenuBg: '#1c2021',
//   selectIcon: '#86EFAC',
//   selectMenuTextColor: '#86EFAC',
//   selectMenuHoverFocused: '#e7fce9',
//   sliderRailColor: '#e0e0e0',
// };

export type CityData = {
  [key: string]:
    | {
        [key: string]: string[];
      }
    | string;
  city: string;
};

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => {
    const client = new QueryClient();

    client.setQueryDefaults(['tabState'], {
      enabled: false,
      gcTime: Infinity,
      staleTime: Infinity,
    });
    client.setQueryData<TabState>(['tabState'], initialTabState);

    client.setQueryDefaults(['searchData'], {
      enabled: false,
      gcTime: Infinity,
      staleTime: Infinity,
    });

    client.setQueryDefaults(['theme'], {
      enabled: false,
      gcTime: Infinity,
      staleTime: Infinity,
    });
    client.setQueryData<ThemeState>(['theme'], initialThemeState);

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export function useTabState() {
  // const queryClient = useQueryClient();

  const { data: tabState } = useQuery<TabState>({
    queryKey: ['tabState'],
    // initialData: queryClient.getQueryData<TabState>(['tabState']),
  });

  return tabState;
  // return queryClient.getQueryData<TabState>(['tabState']);
}

export function useSetTabState() {
  const queryClient = useQueryClient();

  return (tabName: string, value: string) => {
    queryClient.setQueryData<TabState>(['tabState'], (prevState = {}) => {
      return {
        ...prevState,
        [tabName]: value,
      };
    });
  };
}

export function useDeleteTabState() {
  const queryClient = useQueryClient();

  return (tabName: string) => {
    queryClient.setQueryData<TabState>(['tabState'], (prevState = {}) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [tabName]: _, ...remainingTabs } = prevState;
      return remainingTabs;
    });
  };
}

export function useGetNewRoomDetails(category: string) {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<NewListedRoom>(['CategoryDetails', category]);
}

export function useThemeState() {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<ThemeState>(['theme']);
}
