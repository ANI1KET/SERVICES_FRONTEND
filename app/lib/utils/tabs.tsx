import { HomeIcon, ProfileIcon, SearchIcon } from '../icon/svg';

// Navigation Tabs
export const HeaderTabs: [string, React.ReactNode][] = [
  ['buyer', 'FOR BUYER'],
  ['renter', 'FOR RENTER'],
  ['repairer', 'FOR REPAIRER'],
  ['shopper', 'FOR SHOPPER'],
  ['foodie', 'FOR FOODIES'],
  ['client', 'FOR CLIENT'],
];

export const BottomTabs: [string, React.ReactNode][] = [
  ['', <SearchIcon />],
  ['profile', <ProfileIcon />],
  ['', <HomeIcon />],
  ['profile', <ProfileIcon />],
  ['profile', <ProfileIcon />],
];

// Category Tabs
export const categoryTabs: [string, React.ReactNode][] = [
  ['room', 'ROOM'],
  ['store', 'STORE'],
  ['hostel', 'HOSTEL'],
  ['restaurant', 'RESTAURANT'],
  ['land', 'LAND'],
  ['repair', 'REPAIR'],
  ['rental', 'RENTAL'],
];
