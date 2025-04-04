import { throttle } from 'lodash';
import { useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import {
  useSearchData,
  useUpdateSearchFilters,
} from '../providers/reactqueryProvider';
import { PAGE_SIZE } from '../lib/reusableConst';
import { getCityLocations } from './ServerAction';
import { QueryFilters, SearchQueries } from '../types/types';

export const useInfiniteRoomQuery = () => {
  const cachedData = useSearchData();

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
    gcTime: 2 * 60000,
    initialPageParam: 0,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const useFilterUpdater = () => {
  const updateFilters = useUpdateSearchFilters();
  const pendingFiltersRef = useRef<Partial<SearchQueries['filters']>>({});

  const throttledUpdateCache = useRef(
    throttle(
      () => {
        updateFilters(pendingFiltersRef.current);
        pendingFiltersRef.current = {};
      },
      1000,
      { leading: true, trailing: true }
    )
  ).current;

  const updateFilter = useCallback(
    <K extends keyof SearchQueries['filters']>(
      key: K,
      value: SearchQueries['filters'][K]
    ) => {
      pendingFiltersRef.current = {
        ...pendingFiltersRef.current,
        [key]: value,
      };
      throttledUpdateCache();
    },
    [throttledUpdateCache]
  );

  return updateFilter;
};
