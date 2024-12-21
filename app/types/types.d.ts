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
  roomNumber: string;
  city: string;
  direction: string | null;
  location: string;
  price: string;
  mincapacity: number;
  maxcapacity: number;
  roomtype: RoomType;
  furnishingStatus: FurnishingStatus;
  amenities: Aminities[];
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
  updatedAt: Date;
  createdAt: Date;
  ratings: number;
  postedBy: string;
  verified: boolean;
};
