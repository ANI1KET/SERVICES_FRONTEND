import { gql } from '@apollo/client';

export const UpdateRoom = gql(`
    mutation UpdateRoomAvailability(
      $id: ID!, 
      $price:Int,
      $amenities:[String],
      $available: Boolean,
      $ownerContact:String,
      $primaryContact:String,
      $furnishingStatus:FurnishingStatusEnum
    ) {
      updateRoomAvailability(
        id: $id,
        price:$price,
        amenities:$amenities,
        available:$available,
        ownerContact:$ownerContact,
        primaryContact:$primaryContact,
        furnishingStatus:$furnishingStatus
      ) {
        message
      }
    }
`);

export const DeleteRoom = gql(`
    mutation DeleteRoom(
      $id: ID!, 
    ) {
      deleteRoom(
        id: $id,
      ) {
        message
      }
    }
`);

export const GET_LISTED_ROOMS_CITIES_LOCATIONS = gql`
  query GetUserListedRoomDetails($id: ID!) {
    listedRoomCitiesLocations(id: $id) {
      city
      location
    }
  }
`;

export const GET_CITY_LOCATION_ROOMS = gql(`
    query GetCityLocationRooms($city: String!,$location:String,$offset: Int!, $limit: Int!) {
      cityLocationRooms(city: $city,location:$location,offset: $offset, limit: $limit) {
        id
        city
        name
        hall
        price
        kitchen
        bedroom
        location
        direction
        amenities
        available
        ownerContact
        primaryContact
        furnishingStatus
      }
    }
`);

export const GET_ROOM = gql(`
    query GetRoom($id:ID!) {
      room(id:$id) {
        id
        city
        name
        hall
        price
        kitchen
        bedroom
        location
        direction
        amenities
        available
        ownerContact
        primaryContact
        furnishingStatus
      }
    }
`);
