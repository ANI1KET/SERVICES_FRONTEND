'use server';

import { NewListedRoom } from '../types/types';
import axiosInstance from '../lib/utils/axiosInstance';

export async function fetchNewRoomDetails(
  category: string,
  roomId: string
): Promise<NewListedRoom> {
  'use server';
  try {
    const { data } = await axiosInstance.get(`/${category}/${roomId}`);
    return data;
  } catch (error) {
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
}
