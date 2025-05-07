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

export const GET_BORKER_OWNER_STATS = gql`
  query GetBrokerOwnerStats {
    userCategoryStats {
      BROKER {
        total
        users {
          id
          role
          email
          promoting
          permission
        }
      }
      OWNER {
        total
        users {
          id
          role
          email
          promoting
          permission
        }
      }
    }
  }
`;

export const GET_USER_BY_EMAIL_NUMBER = gql(`
  query UserByEmailOrNumber($email:String,$number:String) {
    userByEmailOrNumber(email:$email,number:$number) {
      id
      role
      email
      permission
    }
  }
`);
