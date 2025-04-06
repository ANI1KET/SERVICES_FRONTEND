'use server';

import { cookies } from 'next/headers';

import { NewListedRoom } from '../types/types';
import axiosInstance from '../lib/utils/axiosInstance';

const getSessionToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return (
    cookieStore.get('__Secure-next-auth.session-token')?.value ||
    cookieStore.get('next-auth.session-token')?.value
  );
};

export const updateNumber = async ({
  userId,
  number,
}: {
  userId: string;
  number: string;
}): Promise<string> => {
  'use server';
  try {
    const sessionToken = await getSessionToken();
    const response = await axiosInstance.post(
      `/user/number`,
      { userId, number },
      {
        headers: {
          Cookie: `next-auth.session-token=${sessionToken}`,
          'Cache-Control': 'no-cache',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return 'Failed';
  }
};

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
    const sessionToken = await getSessionToken();
    const { data } = await axiosInstance.post(
      `/interestedrooms/create`,
      {
        userId,
        roomId,
        listerId,
      },
      {
        headers: {
          Cookie: `next-auth.session-token=${sessionToken}`,
          'Cache-Control': 'no-cache',
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
};

export const fetchSelectedRoomDetails = async (
  roomId: string
): Promise<NewListedRoom> => {
  'use server';
  try {
    const { data } = await axiosInstance.get(`/room/${roomId}`);
    return data;
  } catch (error) {
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
};
