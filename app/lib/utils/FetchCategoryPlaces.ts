import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getCategoryCitiesLocations,
  getCategoryCityLocations,
} from './CategoryPlacesServerAction';
import { CityData } from '@/app/providers/reactqueryProvider';

export function fetchCategoryCitiesLocations(category: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['getRoomCitiesLocations'],
    queryFn: async () => {
      const CitiesLocationsData = await getCategoryCitiesLocations({
        category: category,
      });

      const newCacheData = queryClient.setQueryData(
        ['getRoomCitiesLocations'],
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

export function fetchCategoryCityLocations() {
  let city: string, category: string;
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['getRoomCityLocations'],
    queryFn: async () => {
      const CityLocationsData = await getCategoryCityLocations({
        city: city,
        category: category,
      });

      queryClient.setQueryData(['getRoomCitiesLocations'], (cachedData) => {
        return {
          // ...(cachedData as CityData),
          city: city,
          [category]: {
            ...(cachedData?.[category] as Record<string, any>),
            ...CityLocationsData,
          },
        };
      }) as CityData;

      // queryClient.removeQueries({
      //   queryKey: ['getRoomCityLocations'],
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
