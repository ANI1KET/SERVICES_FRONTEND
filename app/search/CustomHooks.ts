import { throttle } from 'lodash';
import { useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import {
  RoomFilters,
  PropertyFilters,
  RoomSearchQueries,
  PropertySearchQueries,
} from '../types/filters';
import {
  useGetRoomSearchData,
  updateRoomSearchData,
  useGetPropertySearchData,
  updatePropertySearchData,
} from '../providers/reactqueryProvider';
import { PAGE_SIZE } from '../lib/reusableConst';
import { getRoomFilteredData, getPropertyFilteredData } from './ServerAction';

// ROOM
export const useInfiniteRoomQuery = () => {
  const cachedData = useGetRoomSearchData();
  const { city, locations, ...filters } =
    (cachedData as RoomSearchQueries) || {};

  return useInfiniteQuery({
    queryKey: ['search/room', cachedData],
    queryFn: ({ pageParam = 0 }) => {
      if (!cachedData) return [];

      return getRoomFilteredData({
        city,
        locations,
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

export const useRoomFilterUpdater = () => {
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

// PROPERTY
export const useInfinitePropertyQuery = () => {
  const cachedData = useGetPropertySearchData();
  const { city, locations, ...filters } =
    (cachedData as PropertySearchQueries) || {};

  return useInfiniteQuery({
    queryKey: ['search/property', cachedData],
    queryFn: ({ pageParam = 0 }) => {
      if (!cachedData) return [];

      return getPropertyFilteredData({
        city,
        locations,
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

export const usePropertyFilterUpdater = () => {
  const updateFilters = updatePropertySearchData();
  const pendingFiltersRef = useRef<Partial<PropertyFilters>>({});

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
    <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => {
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
