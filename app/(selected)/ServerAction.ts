'use server';

import axiosInstance from '../lib/utils/axiosInstance';
import { ListedProperty, ListedRoom } from '../types/types';
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
      `/interestedrooms/add`,
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

export const pushSavedProperty = async ({
  userId,
  listerId,
  propertyId,
}: {
  userId: string;
  listerId: string;
  propertyId: string;
}) => {
  'use server';

  try {
    const { data } = await axiosInstance.post(
      `/interestedproperties/add`,
      {
        userId,
        listerId,
        propertyId,
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

export const fetchSelectedPropertyDetails = async (
  propertyId: string
): Promise<ListedProperty> => {
  'use server';

  try {
    const { data } = await axiosInstance.get(`/property/${propertyId}`);
    return data;
  } catch (error) {
    throw new Error(error?.toString() || 'An unknown error occurred');
  }
};
