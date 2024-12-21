import { QueryFilters } from '../types/types';
import axiosInstance from '../lib/utils/axiosInstance';

const PAGE_SIZE = 2;

export const decodeURLPlaceQuery = (query: string) => {
  try {
    return JSON.parse(atob(query));
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return null;
  }
};

export const getCityLocations = async ({
  category,
  offset = 0,
  decodedCity,
  decodedLocations,
  decodedURLQueryFilters,
}: {
  offset: number;
  category: string;
  decodedCity: string;
  decodedLocations: string[];
  decodedURLQueryFilters: QueryFilters;
}) => {
  const response = await axiosInstance.get(`/place/${category}`, {
    params: {
      offset,
      limit: PAGE_SIZE,
      city: decodedCity,
      locations: decodedLocations,
      filters: decodedURLQueryFilters,
    },
    headers: { 'Cache-Control': 'no-cache' },
  });
  return response.data;
};
