import { gql } from '@apollo/client';

export const updateRoom = gql(`
    mutation UpdateRoomAvailability($id: ID!, $availability: Boolean!) {
      updateRoomAvailability(id: $id, availability: $availability) {
        id
        available
      }
    }
`);
