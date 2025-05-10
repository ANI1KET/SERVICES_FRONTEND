import { throttle } from 'lodash';
import { useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import {
  useGetRoomSearchData,
  updateRoomSearchData,
} from '../providers/reactqueryProvider';
import { PAGE_SIZE } from '../lib/reusableConst';
import { getFilteredData } from './ServerAction';
import { RoomFilters, RoomSearchQueries } from '../types/filters';

export const useInfiniteRoomQuery = () => {
  const cachedData = useGetRoomSearchData();
  const { city, locations, ...filters } =
    (cachedData as RoomSearchQueries) || {};

  return useInfiniteQuery({
    queryKey: ['search/room', cachedData],
    queryFn: ({ pageParam = 0 }) => {
      if (!cachedData) return [];

      return getFilteredData({
        city,
        locations,
        category: 'room',
        filters: filters,
        offset: pageParam,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentOffset = allPages.length * PAGE_SIZE;
      return lastPage.length === PAGE_SIZE ? currentOffset : undefined;
    },
    initialPageParam: 0,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const useFilterUpdater = () => {
  const updateFilters = updateRoomSearchData();
  const pendingFiltersRef = useRef<Partial<RoomFilters>>({});

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
    <K extends keyof RoomFilters>(key: K, value: RoomFilters[K]) => {
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
