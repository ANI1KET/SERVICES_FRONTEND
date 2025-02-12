import { gql } from '@apollo/client';

export const GET_LISTED_ROOM_STATS = gql`
  query ListedRoomStats($id: ID!) {
    totalListedRoom(id: $id) {
      totalAvailableRooms
      totalRoomsListed
      cityWiseStats {
        availableRooms
        city
        totalRooms
        unavailableRooms
      }
    }
  }
`;
