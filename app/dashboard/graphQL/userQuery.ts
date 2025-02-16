import { gql } from '@apollo/client';

export const GET_LISTED_ROOMS = gql`
  query GetUserListedRoomDetails($id: ID!, $offset: Int!, $limit: Int!) {
    user(id: $id) {
      rooms(offset: $offset, limit: $limit) {
        id
        city
        name
        hall
        price
        # photos
        # videos
        # ratings
        kitchen
        bedroom
        # roomtype
        # postedBy
        # verified
        location
        # bathroom
        # createdAt
        direction
        # updatedAt
        amenities
        available
        # maxcapacity
        # mincapacity
        ownerContact
        primaryContact
        furnishingStatus
      }
    }
  }
`;
