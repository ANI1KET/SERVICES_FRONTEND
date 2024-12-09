export type Aminities = "PARKING" | "WIFI";
export type PostedBy = "USER" | "OWNER" | "BROKER";
export type RoomType = "FLAT" | "ONE_BHK" | "TWO_BHK";
export type FurnishingStatus = "UNFURNISHED" | "SEMIFURNISHED" | "FURNISHED";

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
