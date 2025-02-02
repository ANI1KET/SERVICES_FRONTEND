export type Permission =
  | 'room'
  | 'land'
  | 'store'
  | 'hostel'
  | 'repair'
  | 'rental'
  | 'restaurant';
export type PostedBy = 'USER' | 'OWNER' | 'BROKER';
export type Aminities = 'PARKING' | 'WIFI' | 'WATER';
export type RoomType = 'FLAT' | '1BHK' | '2BHK' | '3BHK' | '4BHK';
export type FurnishingStatus = 'UNFURNISHED' | 'SEMIFURNISHED' | 'FURNISHED';

export type QueryFilters = {
  postedby: PostedBy[];
  roomtype: RoomType[];
  amenities: Aminities[];
  price: number | number[];
  rating: number | number[];
  capacity: number | number[];
  verified: boolean | undefined;
  furnishingstatus: FurnishingStatus[];
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
  roomNumber: string;
  mincapacity: number;
  maxcapacity: number;
  amenities: Aminities[];
  price: string | number;
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
  userId: string;
  ratings: number;
  postedBy: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
  available: boolean;
};

export type RoomData = NewListedRoom & {
  user: {
    role: string;
  };
  roomReviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
