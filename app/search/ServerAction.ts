'use server';

import axios from 'axios';

import { ListedRoom } from '../types/types';
import { RoomFilters } from '../types/filters';
import { PAGE_SIZE } from '../lib/reusableConst';
import axiosInstance from '../lib/utils/axiosInstance';

export const getFilteredData = async ({
  city,
  filters,
  category,
  locations,
  offset = 0,
}: {
  city: string;
  offset: number;
  category: string;
  locations: string[];
  filters: RoomFilters;
}): Promise<ListedRoom[]> => {
  'use server';

  try {
    const response = await axiosInstance.get(`/${category}/filter`, {
      params: {
        city,
        offset,
        filters,
        locations,
        limit: PAGE_SIZE,
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
