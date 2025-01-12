import {
  QueryClient,
  InfiniteData,
  useInfiniteQuery,
  QueryObserverResult,
} from '@tanstack/react-query';
import { throttle } from 'lodash';
import { useCallback, useMemo } from 'react';

import { getCityLocations } from './ServerAction';
import { NewListedRoom, QueryFilters, SearchQueries } from '../types/types';

const PAGE_SIZE = 2;

export const useInfiniteRoomQuery = (queryClient: QueryClient) => {
  return useInfiniteQuery({
    queryKey: [`search/room`],
    queryFn: ({ pageParam = 0 }) => {
      const cachedData = queryClient.getQueryData<SearchQueries>([
        'searchData',
      ]);

      return getCityLocations({
        category: 'room',
        offset: pageParam,
        decodedCity: cachedData?.city as string,
        decodedLocations: cachedData?.locations as string[],
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

export const useFilterUpdater = (
  queryClient: QueryClient,
  refetch: () => Promise<
    QueryObserverResult<InfiniteData<NewListedRoom[], unknown>, Error>
  >
) => {
  const debouncedRefetch = useMemo(
    () =>
      throttle(() => {
        refetch();
      }, 1000),
    [refetch]
  );

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

      debouncedRefetch();
    },
    [debouncedRefetch, queryClient]
  );
};
