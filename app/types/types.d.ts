import { FurnishingStatusEnum, Role } from '@prisma/client';

export type RoomType = 'FLAT' | '1BHK' | '2BHK' | '3BHK' | '4BHK';
export type RoomAmenities = 'BIKE PARK' | 'CAR PARK' | 'WIFI' | '24/7 WATER';

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

export type RoomSearchQuery = {
  city: string;
  location: string;
} & RoomFilters;

export type RoomSearchQueries = {
  city: string;
  locations: string[];
  filters: RoomFilters;
};

export type Room = {
  name: string;
  city: string;
  hall: number;
  kitchen: number;
  bedroom: number;
  location: string;
  bathroom: number;
  roomtype: string;
  mincapacity: number;
  maxcapacity: number;
  ownerContact: string;
  price: string | number;
  primaryContact: string;
  direction: string | null;
  amenities: RoomAmenities[];
  furnishingStatus: FurnishingStatusEnum;
  // ENUM
  postedBy: Role;
  // RELATION
  listerId: string;
};

export type RoomWithMedia = Room & {
  photos: File[];
  videos: FileList | null;
};

export type RoomWithMediaUrl = Room & {
  photos: string[];
  videos: string | null;
};

export type ListedRoom = RoomWithMediaUrl & {
  id: string;
  ratings: number;
  verified: boolean;
  available: boolean;
  // DATE
  createdAt: string;
  updatedAt: string;
};

export type RoomData = ListedRoom & {
  lister: {
    id: string;
    role: Role;
    name: string;
    email: string;
    number: string;
    promoteRoomPrice: number;
  };
  reviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

//
export type PropertyAmenities =
  | 'CCTV'
  | 'LIFT'
  | 'GARDEN'
  | 'CAR PARK'
  | 'BIKE PARK'
  | 'FIRE SAFETY'
  | 'SOLAR PANELS'
  | 'SWIMMING POOL';

export type PropertyNearByAreas =
  | 'MALL'
  | 'PARK'
  | 'BANK'
  | 'SCHOOL'
  | 'MARKET'
  | 'TEMPLE'
  | 'CHURCH'
  | 'MOSQUE'
  | 'AIRPORT'
  | 'COLLEGE'
  | 'HOSPITAL'
  | 'BUS STOP'
  | 'FIRE STATION'
  | 'POLICE STATION';

export type PropertyArea =
  | 'sqm'
  | 'dam'
  | 'sqft'
  | 'acre'
  | 'aana'
  | 'dhur'
  | 'bigha'
  | 'paisa'
  | 'ropani'
  | 'kattha';

export type PropertyPlotWidth = 'ft' | 'mt';
export type PropertyPlotLength = 'ft' | 'mt';
export type PropertyHouseArea = 'sqft' | 'sqm';

// export type PropertyFilters = {
//   postedby: Role[];
//   verified?: boolean;
//   price: number | number[];
//   propertyType: PropertyType;
//   amenities: PropertyAmenities[];
//   nearbyAreas: PropertyNearByAreas[];
// };

// export type PropertySearchQuery = {
//   city: string;
//   location: string;
// } & PropertyFilters;

// export type PropertySearchQueries = {
//   city: string;
//   locations: string[];
//   filters: PropertyFilters;
// };

export type BaseProperty = {
  city: string;
  title: string;
  price: number;
  location: string;
  area: PropertyArea;
  description: string;
  ownerContact: string;
  nearbyAreas: PropertyNearByAreas[];
  // price: string | number;
  primaryContact: string;
  direction: string | null;
  // ENUM
  postedBy: Role;
  // RELATION
  sellerId: string;
};

export type House = BaseProperty & {
  floors: number;
  bedrooms: number;
  kitchens: number;
  bathrooms: number;
  amenities: PropertyAmenities[];
  builtUpArea: PropertyHouseArea;

  propertyType: 'House';
};

export type Land = BaseProperty & {
  plotWidth: PropertyPlotWidth;
  plotLength: PropertyPlotLength;

  propertyType: 'Land';
};

export type Property = House | Land;

export type PropertyWithMedia = Property & {
  photos: File[];
  documents: File[];
  video: FileList | null;
};

export type PropertyWithMediaUrl = Property & {
  photos: string[];
  documents: string[];
  video: string | null;
};

export type ListedProperty = PropertyWithMediaUrl & {
  id: string;
  // isActive: boolean;
  verified: boolean;
  // DATE
  createdAt: string;
  updatedAt: string;
};

// export type PropertyData = ListedProperty & {
//   seller: {
//     id: string;
//     role: Role;
//     name: string;
//     email: string;
//     number: string;
//   };
// };

//
