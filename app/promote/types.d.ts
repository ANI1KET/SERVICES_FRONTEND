import { ListedRoom, RoomData } from '../types/types';

export type RoomListers = Pick<RoomData, 'lister'>['lister'] & {
  agreementId: string;
};
export type ListersRooms = Record<string, ListedRoom[]>;

export type Promoter = {
  id: string;
  userId: string;
};

export type PromotionDeal = {
  id: string;
  listerId: string;
  totalEarned: number;
  pricePerClick: number;
  promotionDealId: string;
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
  visiters: Visiters[];
};

export type Visiters = {
  ip: string;
  timestamp: string;
  deviceType: string;
};

export type PromoterWithDeals = Promoter & {
  promotionDeals: PromotionDeal[];
};
