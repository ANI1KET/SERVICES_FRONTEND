'use server';

import axios from 'axios';

import axiosInstance from '../lib/utils/axiosInstance';
import { NewListedRoom, QueryFilters } from '../types/types';

const PAGE_SIZE = 10;

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
}): Promise<NewListedRoom[]> => {
  'use server';

  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};
