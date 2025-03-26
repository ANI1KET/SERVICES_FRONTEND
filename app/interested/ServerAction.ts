'use server';

import { NewListedRoom } from '../types/types';
import axiosInstance from '../lib/utils/axiosInstance';

export async function fetchInterestedRoomDetails(
  roomIds: string[]
): Promise<NewListedRoom[]> {
  'use server';

  try {
    const { data } = await axiosInstance.post(`/room/rooms`, { roomIds });
    return data;
  } catch (error) {
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
}

export async function deleteInterestedRoom(roomId: string): Promise<string> {
  'use server';

  try {
    const { data } = await axiosInstance.delete(`/interestedrooms/delete`, {
      data: { roomId },
    });
    return data.message;
  } catch (error) {
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
}
