import { Amenities, RoomType } from '../types/types';
import { FurnishingStatusEnum, Permission, Role } from '@prisma/client';

export const permissions: Permission[] = [
  'room',
  'hostel',
  'vehicle',
  'property',
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
const rolePermissions: Record<Role, string[]> = {
  USER: ['promote'],
  ADMIN: ['dashboard'],
  OWNER: ['dashboard'],
  BROKER: ['dashboard'],
};

export const canAccessDashboard = (
  role: Role | undefined,
  category: string
): boolean => {
  return rolePermissions[role as Role].includes(category);
};

// MIDDLEWARE
export const canUseDashboard = (
  role: Role,
  category: string,
  secondSegment: string
): boolean => {
  return (
    secondSegment === role.toLowerCase() &&
    rolePermissions[role as Role].includes(category)
  );
};

export const canPromote = (role: Role): boolean => {
  return rolePermissions[role].includes('promote');
};

export const hasPermission = (
  pathSegment: string,
  userPermissions: string[]
): boolean => {
  return userPermissions.includes(pathSegment);
};
