'use server';

import axiosInstance from '@/app/lib/utils/axiosInstance';

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
    const { data } = await axiosInstance.post(`/interestedrooms/create`, {
      userId,
      roomId,
      listerId,
    });
    return data;
  } catch (error) {
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
};
