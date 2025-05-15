import { FurnishingStatusEnum, PropertyType, Role } from '@prisma/client';

import { RoomType, RoomAmenities, PropertyAmenities } from './types';

// ROOM FILTERS
export type RoomFilters = {
  postedby: Role[];
  verified?: boolean;
  roomtype: RoomType[];
  price: number | number[];
  rating: number | number[];
  amenities: RoomAmenities[];
  capacity: number | number[];
  furnishingstatus: FurnishingStatusEnum[];
};

export type RoomSearchQueries = {
  city: string;
  locations: string[];
} & RoomFilters;

// PROPERTY FILTERS
export type PropertyFilters = {
  verified?: boolean;
  area: number | number[];
  price: number | number[];
  propertyType: PropertyType;
  // nearbyAreas: PropertyNearByAreas[];
  // ROOM
  floors: number | number[];
  bedrooms: number | number[];
  kitchens: number | number[];
  bathrooms: number | number[];
  builtUpArea: number | number[];
  amenities: PropertyAmenities[];
  // LAND
  plotWidth: number | number[];
  plotLength: number | number[];
};

export type PropertySearchQueries = {
  city: string;
  locations: string[];
} & PropertyFilters;
