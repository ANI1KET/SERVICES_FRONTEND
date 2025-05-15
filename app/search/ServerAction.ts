'use server';

import axios from 'axios';

import { PAGE_SIZE } from '../lib/reusableConst';
import axiosInstance from '../lib/utils/axiosInstance';
import { ListedProperty, ListedRoom } from '../types/types';
import { PropertyFilters, RoomFilters } from '../types/filters';

export const getRoomFilteredData = async ({
  city,
  filters,
  locations,
  offset = 0,
}: {
  city: string;
  offset: number;
  locations: string[];
  filters: RoomFilters;
}): Promise<ListedRoom[]> => {
  'use server';

  try {
    const response = await axiosInstance.get('room/filter', {
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

export const getPropertyFilteredData = async ({
  city,
  filters,
  locations,
  offset = 0,
}: {
  city: string;
  offset: number;
  locations: string[];
  filters: PropertyFilters;
}): Promise<ListedProperty[]> => {
  'use server';

  try {
    const response = await axiosInstance.get('property/filter', {
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
