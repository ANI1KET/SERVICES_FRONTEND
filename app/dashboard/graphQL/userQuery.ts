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
        photos
        videos
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

export const UPDATE_USER = gql(`
  mutation UpdateUserRolePermission(
    $role:Role,
    $userId: ID!,
    $durationInDays:Int!,
    $permission: Permission!
  ) {
    updateRolePermission(
      role:$role,
      userId: $userId,
      permission:$permission,
      durationInDays:$durationInDays,
    ) {
      message
    }
  }
`);

export const DOWNGRADE_USER = gql(`
  mutation DowngradeUserPermission(
    $userId: ID!,
    $permission: Permission!
    $promoting:[Permission]!
  ) {
    downgradePermission(
      userId: $userId,
      promoting:$promoting,
      permission:$permission,
    ) {
      message
    }
  }
`);

export const REMOVE_USER_SUBS = gql(`
  mutation DowngradeUserPermission(
    $userId: ID!,
    $promoting:[Permission]!,
    $permissions:[Permission]!
  ) {
    removeUserSubs(
      userId: $userId,
      promoting:$promoting
      permissions:$permissions
    ) {
      message
    }
  }
`);
