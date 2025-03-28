import { gql } from '@apollo/client';

export const GET_INTERESTED_ROOMS = gql(`
    query getInterestedRooms($listerId:ID!) {
      interestedRooms(listerId:$listerId) {
        id
        roomId
        room {
          city
          price
          location
          direction
          amenities
          direction
          available
          mincapacity
          maxcapacity
          ownerContact
          primaryContact
          furnishingStatus
        }
        interestedBy {
          createdAt
          user {
            id
            name
            email
            number
          }
        }
      }
    }
  `);

export const DELETE_INTERESTED_USER = gql(`
    mutation DeleteInterestedUser($userId:ID!,$id:ID!) {
        deleteInterestedUser(userId:$userId,id:$id) {
            message
      }
    }
  `);
