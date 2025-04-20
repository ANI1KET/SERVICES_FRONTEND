'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getCategoryCityLocations,
  getCategoryCitiesLocations,
} from './CategoryPlacesServerAction';
import { CityData } from '@/app/providers/reactqueryProvider';

export function FetchCategoryCitiesLocations(category: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['getCategoryCitiesLocations'],
    queryFn: async () => {
      const CitiesLocationsData = await getCategoryCitiesLocations(category);

      const newCacheData = queryClient.setQueryData(
        ['getCategoryCitiesLocations'],
        (cachedData: CityData | undefined) => {
          if (!cachedData) {
            return {
              city: CitiesLocationsData.city,
              [category]: CitiesLocationsData[category],
            };
          }

          return {
            ...cachedData,
            [category]: CitiesLocationsData[category],
          };
        }
      ) as CityData;

      return newCacheData;
    },
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}

export function FetchCategoryCityLocations() {
  let city: string, category: string;
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['getCategoryCityLocations'],
    queryFn: async () => {
      const CityLocationsData = await getCategoryCityLocations({
        city: city,
        category: category,
      });

      queryClient.setQueryData(['getCategoryCitiesLocations'], (cachedData) => {
        return {
          ...(cachedData as CityData),
          city: city,
          [category]: {
            ...(cachedData?.[category] as Record<string, string[]>),
            ...CityLocationsData,
          },
        };
      }) as CityData;

      // queryClient.removeQueries({
      //   queryKey: ['getCategoryCityLocations'],
      //   exact: true,
      // });

      // return CityLocationsData;
      return null;
    },
    retry: 0,
    gcTime: 0,
    staleTime: 0,
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const reFetchCityLocations = (City: string, Category: string) => {
    city = City;
    category = Category;
    query.refetch();
  };

  return { ...query, reFetchCityLocations };
}
