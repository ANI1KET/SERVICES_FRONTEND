'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useState, useEffect, useCallback } from 'react';

import { RoomData } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { PAGE_SIZE } from '@/app/lib/reusableConst';
import { getCategoryDetails } from './ServerAction';
import RoomDetails from '../../ReUsable/RoomDetails';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const RoomCardLayout: React.FC<{
  city: string;
  title: string;
  route: string;
  cities: { [key: string]: string[] };
}> = ({ city, cities, title, route }) => {
  const cachedTheme = useThemeState();
  const [City, setCity] = useState(city || 'Kathmandu');

  // const defaultRooms: RoomData[] = [
  //   {
  //     id: 'default-room-1',
  //     userId: 'default-user',
  //     ratings: 0,
  //     postedBy: 'Admin',
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //     verified: false,
  //     available: true,
  //     name: 'Default Room',
  //     city: 'Default City',
  //     location: 'Default Location',
  //     bedroom: 1,
  //     hall: 1,
  //     kitchen: 1,
  //     bathroom: 1,
  //     roomtype: 'Single',
  //     mincapacity: 1,
  //     maxcapacity: 2,
  //     ownerContact: '0000000000',
  //     primaryContact: '0000000000',
  //     direction: null,
  //     furnishingStatus: 'Unfurnished',
  //     amenities: ['WiFi', 'Parking'],
  //     price: '1000',
  //     photos: [],
  //     videos: null,
  //     user: {
  //       role: 'guest',
  //     },
  //     roomReviews: [],
  //   },
  // ];

  // const preloadedData = useMemo(() => {
  //   return {
  //     pages: [defaultRooms],
  //     pageParams: [0],
  //   };
  // }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: [`${route}${City}`],
      queryFn: ({ pageParam = 0 }) =>
        getCategoryDetails({
          city: City,
          category: route,
          offset: pageParam,
        }),
      getNextPageParam: (lastPage, allPages) => {
        const currentOffset = allPages.length * PAGE_SIZE;
        return lastPage.length === PAGE_SIZE ? currentOffset : undefined;
      },
      initialPageParam: 0,
      gcTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 10,
      refetchOnReconnect: false,
      // initialData: preloadedData,
      refetchOnWindowFocus: false,
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '300px',
        threshold: 0,
      }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleLoadMore]);
  return (
    <div className="w-full ">
      <p
        className={cn(
          cachedTheme?.textColor,
          'text-2xl font-semibold text-center'
        )}
      >
        {title}
      </p>
      <div
        className={cn(
          cachedTheme?.borderColor,
          'flex overflow-x-scroll border-[1px] rounded-t-lg'
        )}
      >
        {cities &&
          Object.keys(cities).map((city) => (
            <span
              key={city}
              onClick={() => setCity(city)}
              className={cn(
                cachedTheme?.borderColor,
                'p-2 border-r-[1px] rounded-xl cursor-pointer',
                City === city && [cachedTheme?.bg, cachedTheme?.textColor]
              )}
            >
              {city}
            </span>
          ))}
      </div>

      {isFetching ? (
        <div className="h-[80vh] bg-gray-200 animate-pulse rounded-b-lg flex items-center justify-center">
          <div
            className={cn(
              'w-full h-full grid grid-rows-2 gap-1 rounded-b-md',
              'xl:grid-cols-4',
              'md:grid-cols-3',
              'max-sm:grid-cols-2',
              'max-xsm:grid-cols-1'
            )}
          >
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-400 rounded w-full h-full"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <RoomDetails
          city={City}
          observerRef={observerRef}
          isFetchingNextPage={isFetchingNextPage}
          data={data?.pages as RoomData[][] | undefined}
        />
      )}
    </div>
  );
};

export default RoomCardLayout;
