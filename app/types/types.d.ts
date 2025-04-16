import { FurnishingStatusEnum, Role } from '@prisma/client';

export type RoomType = 'FLAT' | '1BHK' | '2BHK' | '3BHK' | '4BHK';
export type Amenities = 'BIKE PARK' | 'CAR PARK' | 'WIFI' | '24/7 WATER';

export type QueryFilters = {
  postedby: Role[];
  roomtype: RoomType[];
  amenities: Amenities[];
  price: number | number[];
  rating: number | number[];
  capacity: number | number[];
  verified: boolean | undefined;
  furnishingstatus: FurnishingStatusEnum[];
};

export type SearchQuery = {
  city: string;
  location: string;
} & QueryFilters;

export type SearchQueries = {
  city: string;
  locations: string[];
  filters: QueryFilters;
};

export type Room = {
  name: string;
  city: string;
  location: string;
  bedroom: number;
  hall: number;
  kitchen: number;
  bathroom: number;
  roomtype: string;
  mincapacity: number;
  maxcapacity: number;
  ownerContact: string;
  amenities: string[];
  price: string | number;
  primaryContact: string;
  direction: string | null;
  furnishingStatus: FurnishingStatus;
};

export type RoomWithMedia = Room & {
  photos: File[];
  videos: FileList | null;
};

export type RoomWithMediaUrl = Room & {
  photos: string[];
  videos: string | null;
};

export type NewListedRoom = RoomWithMediaUrl & {
  id: string;
  ratings: number;
  listerId: string;
  postedBy: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
  available: boolean;
};

export type RoomData = NewListedRoom & {
  user: {
    id: string;
    role: Role;
    name: string;
    email: string;
    number: string;
    promoteRoomPrice: number;
  };
  roomReviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type GroupedRooms = Record<string, NewListedRoom[]>;
export type UserFromRoomData = Pick<RoomData, 'user'>['user'];

export type Promoter = {
  id: string;
  userId: string;
};

export type PromotionDeal = {
  id: string;
  listerId: string;
  promoterId: string;
  totalEarned: number;
  pricePerClick: number;
  lister: {
    name: string;
    email: string;
    number: string | null;
  };
  promotions: Promotion[];
};

export type Promotion = {
  id: string;
  roomId: string;
  clicks: number;
  shortUrl: string;
  expiresAt: string;
  createdAt: string;
  originalUrl: string;
  agreementId: string;
  totalEarned: number;
  room: {
    name: string;
    city: string;
    price: number;
    location: string;
  };
  clickEvents: ClickEvent[];
};

export type ClickEvent = {
  ip: string;
  timestamp: string;
  deviceType: string;
};

export type PromoterWithDeals = Promoter & {
  promotionDeals: PromotionDeal[];
};
