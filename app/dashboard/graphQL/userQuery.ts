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

export const UpdateUser = gql(`
  mutation UpdateUserRolePermission(
    $id: ID!,
    $role:Role,
    $permission: [Permission!]!
  ) {
    updateRolePermission(
      id: $id,
      role:$role,
      permission:$permission
    ) {
      message
    }
  }
`);

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
