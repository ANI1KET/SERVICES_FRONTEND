export type Aminities = 'PARKING' | 'WIFI';
export type PostedBy = 'USER' | 'OWNER' | 'BROKER';
export type RoomType = 'FLAT' | 'ONE_BHK' | 'TWO_BHK';
export type FurnishingStatus = 'UNFURNISHED' | 'SEMIFURNISHED' | 'FURNISHED';

export type QueryFilters = {
  verified: boolean;
  postedby: PostedBy[];
  roomtype: RoomType[];
  amenities: Aminities[];
  price: number | number[];
  rating: number | number[];
  capacity: number | number[];
  furnishingstatus: FurnishingStatus[];
};

export type DefaultQueryFilters = {
  Verified: boolean;
  postedBy: PostedBy[];
  roomType: RoomType[];
  Amenities: Aminities[];
  priceRange: number | number[];
  ratingRange: number | number[];
  capacityValue: number | number[];
  furnishingStatus: FurnishingStatus[];
};

export type SearchQuery = {
  city: string;
  location: string;
} & QueryFilters;

export type Room = {
  name: string;
  city: string;
  location: string;
  roomtype: RoomType;
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
    comment: String;
    createdAt: string;
    updatedAt: string;
  }[];
};
