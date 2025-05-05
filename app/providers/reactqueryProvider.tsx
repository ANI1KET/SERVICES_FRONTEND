'use client';

import { makeVar, useReactiveVar } from '@apollo/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RoomSearchQueries } from '../types/types';

export interface TabState {
  [key: string]: string;
}

export interface ThemeState {
  bg: string;
  activeBg: string;
  textColor: string;
  ringColor: string;
  borderColor: string;
  svgIconColor: string;
  activeRingColor: string;
  activeTextColor: string;
  activeListHover: string;
  activeBorderColor: string;
  activeListHoverText: string;
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
  sliderRailColor: string;
  selectMenuTextColor: string;
  selectMenuHoverFocused: string;
  bottomBarActiveTextColor: string;
  // DASHBOARD
  labelColor: string;
}

const initialTabState: TabState = {
  CategoryTab: 'room',
};

const initialThemeState = {
  bg: 'bg-green-300',
  svgIconColor: 'black',
  textColor: 'text-black',
  activeBg: 'bg-neutral-900',
  borderColor: 'border-black',
  ringColor: 'hover:ring-green',
  bottomBarActiveTextColor: 'black',
  activeTextColor: 'text-green-200',
  activeRingColor: 'hover:ring-black',
  activeBorderColor: 'border-green-300',
  activeListHover: 'hover:bg-neutral-900',
  activeListHoverText: 'hover:text-green-200',
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
  // DASHBOARD
  labelColor: 'black',
};

// const initialThemeState = {
//   bg: 'bg-neutral-900',
//   ringColor: 'hover:ring-black',
//   activeBg: 'bg-green-300',
//   activeRingColor: 'hover:ring-green',
//   svgIconColor: 'lightgreen',
//   textColor: 'text-green-200',
//   activeTextColor: 'text-black',
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
//   selectIcon: '#86EFAC',
//   selectMenuBg: '#1c2021',
//   sliderRailColor: '#e0e0e0',
//   selectMenuTextColor: '#86EFAC',
//   selectMenuHoverFocused: '#e7fce9',
//   // DASHBOARD
//   labelColor: '#86EFAC',
// };

export const tabStateVar = makeVar<TabState>(initialTabState);
export const themeVar = makeVar<ThemeState>(initialThemeState);
export const searchDataVar = makeVar<RoomSearchQueries | undefined>(undefined);

export type CityData = {
  city: string;
  [key: string]: Record<string, string[]> | string;
};

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [queryClient] = useState(() => {
  //   const client = new QueryClient();
  //   return client;
  // });
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export function useTabState() {
  return useReactiveVar(tabStateVar);
}

export function useSetTabState() {
  return (tabName: string, value: string) => {
    tabStateVar({
      ...tabStateVar(),
      [tabName]: value,
    });
  };
}

export function useDeleteTabState() {
  return (tabName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [tabName]: _, ...remainingTabs } = tabStateVar();
    tabStateVar(remainingTabs);
  };
}

export function useThemeState() {
  return useReactiveVar(themeVar);
}

export function useSearchData() {
  return useReactiveVar(searchDataVar);
}

export function useSetSearchData() {
  return (
    city: string,
    locations: string[],
    data: RoomSearchQueries['filters']
  ) => {
    searchDataVar({
      city,
      locations,
      filters: {
        price: data.price,
        rating: data.rating,
        capacity: data.capacity,
        verified: data.verified || undefined,
        postedby: data.postedby,
        roomtype: data.roomtype,
        amenities: data.amenities,
        furnishingstatus: data.furnishingstatus,
      },
    });
  };
}

export function useUpdateSearchFilters() {
  return (filtersToApply: Partial<RoomSearchQueries['filters']>) => {
    const prevData = searchDataVar();
    if (!prevData) return;

    searchDataVar({
      ...prevData,
      filters: {
        ...prevData.filters,
        ...filtersToApply,
      },
    });
  };
}
