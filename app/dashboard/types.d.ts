import { Room } from '../types/types';

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
