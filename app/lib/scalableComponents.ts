import {
  RoomType,
  PropertyArea,
  RoomAmenities,
  PropertyHouseArea,
  PropertyAmenities,
  PropertyPlotWidth,
  PropertyPlotLength,
  PropertyNearByAreas,
} from '../types/types';
import {
  Role,
  Permission,
  PropertyType,
  FurnishingStatusEnum,
} from '@prisma/client';

export const permissions: Permission[] = [
  'room',
  'hostel',
  'vehicle',
  'property',
  'reMarketItem',
];
export const roles: Role[] = ['OWNER', 'BROKER', 'USER'];
export const postedBy: Role[] = ['OWNER', 'BROKER'];

// ROOM FILTERS
export const roomAmenities: RoomAmenities[] = [
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
export const roomType: RoomType[] = ['1BHK', '2BHK', '3BHK', '4BHK', 'FLAT'];

// PROPERTY FILTERS
export const propertyAmenities: PropertyAmenities[] = [
  'CCTV',
  'LIFT',
  'GARDEN',
  'CAR PARK',
  'BIKE PARK',
  'FIRE SAFETY',
  'SOLAR PANELS',
  'SWIMMING POOL',
];
export const propertyNearByAreas: PropertyNearByAreas[] = [
  'HOSPITAL',
  'MARKET',
  'SCHOOL',
  'COLLEGE',
  'BANK',
  'MALL',
  'PARK',
  'TEMPLE',
  'CHURCH',
  'MOSQUE',
  'AIRPORT',
  'BUS STOP',
  'FIRE STATION',
  'POLICE STATION',
];
export const propertyArea: PropertyArea[] = [
  'sqm',
  'sqft',
  'acre',
  'aana',
  'dhur',
  'bigha',
  'kattha',
  // 'dam',
  // 'paisa',
  // 'ropani',
];
export const propertyType: PropertyType[] = ['House', 'Land'];
export const propertyPlotWidth: PropertyPlotWidth[] = ['ft', 'mt'];
export const propertyPlotLength: PropertyPlotLength[] = ['ft', 'mt'];
export const propertyHouseArea: PropertyHouseArea[] = ['sqft', 'sqm'];

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
