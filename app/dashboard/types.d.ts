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
