'use server';

import { ListedRoom } from '../types/types';
import axiosInstance from '../lib/utils/axiosInstance';
import { getAutheticationHeader } from '../components/ServerAction';

export const pushSavedRoom = async ({
  userId,
  roomId,
  listerId,
}: {
  userId: string;
  roomId: string;
  listerId: string;
}) => {
  'use server';

  try {
    const { data } = await axiosInstance.post(
      `/interestedrooms/create`,
      {
        userId,
        roomId,
        listerId,
      },
      await getAutheticationHeader()
      // { ...(await getAutheticationHeader()) }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
};

export const fetchSelectedRoomDetails = async (
  roomId: string
): Promise<ListedRoom> => {
  'use server';

  try {
    const { data } = await axiosInstance.get(`/room/${roomId}`);
    return data;
  } catch (error) {
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
};
