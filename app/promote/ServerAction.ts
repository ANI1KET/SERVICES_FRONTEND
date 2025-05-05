'use server';

import axios from 'axios';

import { ListedRoom } from '../types/types';
import axiosInstance from '../lib/utils/axiosInstance';
import { PROMOTE_PAGE_SIZE } from '../lib/reusableConst';
import { PromoterWithDeals, RoomListers } from './types';
import { getAutheticationHeader } from '../components/ServerAction';

export const getPromotingDetails = async ({
  userId,
  offset = 0,
}: {
  userId: string;
  offset: number;
}): Promise<{
  listers: RoomListers[];
  listerRooms: ListedRoom[];
}> => {
  'use server';

  try {
    const response = await axiosInstance.get(`/promote/room/${userId}`, {
      params: {
        offset,
        limit: PROMOTE_PAGE_SIZE,
      },
      ...(await getAutheticationHeader()),
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
}): Promise<ListedRoom[]> => {
  'use server';

  try {
    const response = await axiosInstance.get(`/promote/listerrooms`, {
      params: {
        offset,
        listerId,
        limit: PROMOTE_PAGE_SIZE,
      },
      ...(await getAutheticationHeader()),
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const promoteRoom = async ({
  userId,
  agreementId,
}: {
  userId: string;
  agreementId: string;
}) => {
  // }): Promise<> => {
  'use server';

  try {
    const response = await axiosInstance.post(
      `/promote`,
      {
        userId,
        agreementId,
      },
      await getAutheticationHeader()
      // { ...(await getAutheticationHeader()) }
    );

    return response.data.promotionDealId;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const addPromotion = async ({
  roomId,
  agreementId,
  promotionDealId,
}: {
  roomId: string;
  agreementId: string;
  promotionDealId: string;
}) => {
  // }): Promise<> => {
  'use server';

  try {
    const response = await axiosInstance.post(
      `/promote/room`,
      {
        roomId,
        agreementId,
        promotionDealId,
        url: `${process.env.NEXTAUTH_URL}/room/${btoa(roomId)}`,
      },
      await getAutheticationHeader()
      // { ...(await getAutheticationHeader()) }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const getPromoterDetails = async (
  userId: string
): Promise<PromoterWithDeals | undefined> => {
  'use server';

  try {
    const response = await axiosInstance.get(`/promote/${userId}`, {
      ...(await getAutheticationHeader()),
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      return;
    }
    console.error(error);
    return;
  }
};

export const removeRoom = async (
  roomPromotionId: string
  // ) => {
): Promise<string> => {
  'use server';

  try {
    const response = await axiosInstance.delete(
      `/promote/remove/${roomPromotionId}`,
      {
        ...(await getAutheticationHeader()),
      }
    );

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      return '';
    }
    console.error(error);
    return '';
  }
};

export const renewPromotion = async (
  roomPromotionId: string
): Promise<string> => {
  'use server';

  try {
    const response = await axiosInstance.put(
      `/promote/renew/${roomPromotionId}`,
      {},
      await getAutheticationHeader()
      // { ...(await getAutheticationHeader()) }
    );

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      return '';
    }
    console.error(error);
    return '';
  }
};
