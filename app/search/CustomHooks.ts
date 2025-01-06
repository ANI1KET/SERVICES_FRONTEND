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
  const debouncedRefetch = useCallback(
    throttle(() => {
      refetch();
    }, 1000),
    [refetch]
  );

  return useCallback(
    (key: keyof QueryFilters, value: any) => {
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
