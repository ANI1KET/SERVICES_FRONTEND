import { throttle } from 'lodash';
import { useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import {
  useSearchData,
  useUpdateSearchFilters,
} from '../providers/reactqueryProvider';
import { PAGE_SIZE } from '../lib/reusableConst';
import { getCityLocations } from './ServerAction';
import { RoomFilters, RoomSearchQueries } from '../types/types';

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
        decodedURLQueryFilters: cachedData.filters as RoomFilters,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentOffset = allPages.length * PAGE_SIZE;
      return lastPage.length === PAGE_SIZE ? currentOffset : undefined;
    },
    gcTime: 5 * 60000,
    initialPageParam: 0,
    staleTime: 5 * 60000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const useFilterUpdater = () => {
  const updateFilters = useUpdateSearchFilters();
  const pendingFiltersRef = useRef<Partial<RoomSearchQueries['filters']>>({});

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
    <K extends keyof RoomSearchQueries['filters']>(
      key: K,
      value: RoomSearchQueries['filters'][K]
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
