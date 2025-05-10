import { FurnishingStatusEnum, Role } from '@prisma/client';

import { RoomAmenities, RoomType } from './types';

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
  price: number | number[];
  propertyType: PropertyType[];
  amenities: PropertyAmenities[];
  nearbyAreas: PropertyNearByAreas[];

  bedrooms?: number | number[]; // For House
  bathrooms?: number | number[]; // For House
  kitchens?: number | number[]; // For House
  floors?: number | number[]; // For House
  plotwidth?: string | string[]; // For Land
  plotlength?: string | string[]; // For Land
};

export type PropertySearchQueries = {
  city: string;
  locations: string[];
} & PropertyFilters;
