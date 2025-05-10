'use client';

import RoomSearchForm from './SearchForm/RoomSearchForm';
import { useGetCity, useTabState } from '@/app/providers/reactqueryProvider';

const SearchForm = () => {
  const tabState = useTabState();
  const category = tabState['CategoryTab'] as string;

  const city = useGetCity();

  const CategoryFormLayout: Record<string, React.ReactNode> = {
    room: <RoomSearchForm category={category} city={city as string} />,
  };
  return CategoryFormLayout[category];
};

export default SearchForm;
