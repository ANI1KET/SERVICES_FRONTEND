'use client';

import { useState } from 'react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NewListedRoom } from '../types/types';

export interface TabState {
  [key: string]: string;
}

const initialTabState: TabState = {
  CategoryTab: 'room',
  ListCategoryTab: 'room',
};

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

export function useGetNewRoomDetails() {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<NewListedRoom>(['roomDetails']);
}
