import { throttle } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';

import { PAGE_SIZE } from '../lib/reusableConst';
import { getCityLocations } from './ServerAction';
import { QueryFilters, SearchQueries } from '../types/types';

export const useInfiniteRoomQuery = (queryClient: QueryClient) => {
  const cachedData = queryClient.getQueryData<SearchQueries>(['searchData']);

  return useInfiniteQuery({
    queryKey: ['search/room', cachedData?.city, cachedData?.filters],
    queryFn: ({ pageParam = 0 }) => {
      if (!cachedData) return [];

      return getCityLocations({
        category: 'room',
        offset: pageParam,
        decodedCity: cachedData.city,
        decodedLocations: cachedData.locations,
        decodedURLQueryFilters: cachedData.filters as QueryFilters,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentOffset = allPages.length * PAGE_SIZE;
      return lastPage.length === PAGE_SIZE ? currentOffset : undefined;
    },
    staleTime: 0,
    gcTime: 60000,
    initialPageParam: 0,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const useFilterUpdater = (queryClient: QueryClient) => {
  const [, setPendingFilters] = useState<Partial<SearchQueries['filters']>>({});

  const throttledUpdateCache = useMemo(
    () =>
      throttle((filtersToApply: Partial<SearchQueries['filters']>) => {
        queryClient.setQueryData<SearchQueries>(['searchData'], (prevData) => {
          if (!prevData) return undefined;
          return {
            ...prevData,
            filters: { ...prevData.filters, ...filtersToApply },
          };
        });

        setPendingFilters({});
      }, 1000),
    [queryClient]
  );

  const updateFilter = useCallback(
    <K extends keyof SearchQueries['filters']>(
      key: K,
      value: SearchQueries['filters'][K]
    ) => {
      setPendingFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        throttledUpdateCache(newFilters);
        return newFilters;
      });
    },
    [throttledUpdateCache]
  );

  return updateFilter;
};
