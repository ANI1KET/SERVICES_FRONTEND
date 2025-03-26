import {
  QueryClient,
  InfiniteData,
  useInfiniteQuery,
  QueryObserverResult,
} from '@tanstack/react-query';
import { throttle } from 'lodash';
import { useCallback } from 'react';

import { getCityLocations } from './ServerAction';
import { NewListedRoom, QueryFilters, SearchQueries } from '../types/types';

const PAGE_SIZE = 10;

export const useInfiniteRoomQuery = (queryClient: QueryClient) => {
  const cachedData = queryClient.getQueryData<SearchQueries>(['searchData']);

  return useInfiniteQuery({
    queryKey: [`search/room`],
    queryFn: ({ pageParam = 0 }) => {
      if (!cachedData) return [];

      return getCityLocations({
        category: 'room',
        offset: pageParam,
        decodedCity: cachedData.city,
        decodedLocations: cachedData.locations,
        decodedURLQueryFilters: cachedData?.filters as QueryFilters,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentOffset = allPages.length * PAGE_SIZE;
      return lastPage.length === PAGE_SIZE ? currentOffset : undefined;
    },
    initialPageParam: 0,
    // gcTime: 1000 * 60 * 10,
    // staleTime: 1000 * 60 * 10,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

const throttledRefetch = throttle((refetch: () => void) => refetch(), 1000);

export const useFilterUpdater = (
  queryClient: QueryClient,
  refetch: () => Promise<
    QueryObserverResult<InfiniteData<NewListedRoom[], unknown>, Error>
  >
) => {
  return useCallback(
    <K extends keyof SearchQueries['filters']>(
      key: K,
      value: SearchQueries['filters'][K]
    ) => {
      queryClient.setQueryData<SearchQueries>(['searchData'], (prevData) => {
        if (!prevData) return undefined;
        return {
          ...prevData,
          filters: {
            ...prevData.filters,
            [key]: value,
          },
        };
      });

      throttledRefetch(refetch);
    },
    [queryClient, refetch]
  );
};
