import { Room } from '../types/types';
import { Permission } from '@prisma/client';

type CityRoomStats = {
  city: string;
  totalRooms: number;
  availableRooms: number;
  unavailableRooms: number;
};

export type RoomStats = {
  totalRoomsListed: string;
  totalAvailableRooms: string;
  cityWiseStats: CityRoomStats[];
};

export interface User {
  id: string;
  name: string;
  email: string;
  number: string | null;
}

export interface InterestedBy {
  user: User;
  createdAt: string;
}

export interface RoomData {
  id: string;
  roomId: string;
  room: Room & {
    available: boolean;
  };
  interestedBy: InterestedBy[];
}

interface Promotion {
  price: number;
  number?: string;
  promoteCategory: Permission;
}

export type StartPromotion = Promotion;
export type UpdatetPromotion = Omit<Promotion, 'number'>;
export type DeletetPromotion = Omit<Promotion, 'number' | 'price'>;
