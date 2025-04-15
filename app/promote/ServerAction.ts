'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import axiosInstance from '../lib/utils/axiosInstance';
import { PROMOTE_PAGE_SIZE } from '../lib/reusableConst';
import { NewListedRoom, UserFromRoomData } from '../types/types';

const getSessionToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return (
    cookieStore.get('__Secure-next-auth.session-token')?.value ||
    cookieStore.get('next-auth.session-token')?.value
  );
};

export const getPromotingDetails = async ({
  offset = 0,
}: {
  offset: number;
}): Promise<{ listers: UserFromRoomData[]; listerRooms: NewListedRoom[] }> => {
  'use server';

  try {
    const sessionToken = await getSessionToken();
    const response = await axiosInstance.get(`/promote/room`, {
      params: {
        offset,
        limit: PROMOTE_PAGE_SIZE,
      },
      headers: {
        Cookie: `next-auth.session-token=${sessionToken}`,
        'Cache-Control': 'no-cache',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const getListerRoomsDetails = async ({
  listerId,
  offset = 0,
}: {
  offset: number;
  listerId: string;
}): Promise<NewListedRoom[]> => {
  'use server';

  try {
    const sessionToken = await getSessionToken();
    const response = await axiosInstance.get(`/promote/listerrooms`, {
      params: {
        offset,
        listerId,
        limit: PROMOTE_PAGE_SIZE,
      },
      headers: {
        Cookie: `next-auth.session-token=${sessionToken}`,
        'Cache-Control': 'no-cache',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const getPromotionLink = async ({
  userId,
  roomId,
  listerId,
  pricePerClick,
}: {
  userId: string;
  roomId: string;
  listerId: string;
  pricePerClick: number;
}) => {
  // }): Promise<> => {
  'use server';

  try {
    const sessionToken = await getSessionToken();
    const response = await axiosInstance.post(
      `/url/short`,
      {
        userId,
        roomId,
        listerId,
        pricePerClick,
        url: `${process.env.NEXTAUTH_URL}/room/${btoa(roomId)}`,
      },
      {
        headers: {
          'Cache-Control': 'no-cache',
          Cookie: `next-auth.session-token=${sessionToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};
