'use server';

import axiosInstance from '../lib/utils/axiosInstance';
import { ListedProperty, ListedRoom } from '../types/types';

export async function fetchNewRoomDetails(roomId: string): Promise<ListedRoom> {
  'use server';
  try {
    const { data } = await axiosInstance.get(`/room/${roomId}`);
    return data;
  } catch (error) {
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
}

export async function fetchNewPropertyDetails(
  propertyId: string
): Promise<ListedProperty> {
  'use server';
  try {
    const { data } = await axiosInstance.get(`/property/${propertyId}`);
    return data;
  } catch (error) {
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
}
