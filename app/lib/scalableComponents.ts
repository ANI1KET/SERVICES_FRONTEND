import { Amenities, RoomType } from '../types/types';
import { FurnishingStatusEnum, Permission, Role } from '@prisma/client';

export const permissions: Permission[] = [
  'room',
  'hostel',
  'property',
  'vehicle',
  'reMarketItem',
];
export const roles: Role[] = ['OWNER', 'BROKER', 'USER'];

// FILTERS
export const amenities: Amenities[] = [
  'WIFI',
  'CAR PARK',
  'BIKE PARK',
  '24/7 WATER',
];
export const furnishingStatus: FurnishingStatusEnum[] = [
  'FURNISHED',
  'UNFURNISHED',
  'SEMIFURNISHED',
];
export const postedBy: Role[] = ['OWNER', 'BROKER'];
export const roomType: RoomType[] = ['1BHK', '2BHK', '3BHK', '4BHK', 'FLAT'];

// AUTHENTICATION

// AUTHORIZATION
const permission: Record<Role, string[]> = {
  USER: [],
  ADMIN: ['dashboard'],
  OWNER: ['dashboard'],
  BROKER: ['dashboard'],
};

export const canAccessDashboard = (
  role: Role | undefined,
  category: string
): boolean => {
  return permission[role as Role].includes(category);
};
