'use client';

import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import ImageLoop from '@/app/lib/ui/ImageLoop';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { getCategoryDetails } from './ServerAction';
import { PAGE_SIZE } from '@/app/lib/reusableConst';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { CapacityIcon, FurnishIcon, PriceIcon } from '@/app/lib/icon/svg';

const CategoryCardLayout: React.FC<{
  city: string;
  title: string;
  route: string;
  cities: { [key: string]: string[] };
}> = ({ city, cities, title, route }) => {
  const router = useRouter();
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
      <div className="w-full flex overflow-x-auto ">
        <div className={cn('grid grid-rows-2 ')}>
          {data?.pages.map((page, pageIndex) =>
            page.map((item, index: number) => (
              <div
                className={cn(
                  `cursor-pointer `,
                  index % 2 === 0 ? 'row-start-1' : 'row-start-2'
                )}
                key={`${pageIndex}${index}`}
                onClick={() =>
                  router.push(`/room/${btoa(`${item.id},${City}`)}`)
                }
              >
                {item.videos ? (
                  <div
                    className={cn(
                      'xl:w-[25vw] aspect-video ',
                      'md:w-[33.3vw] ',
                      'max-sm:w-[50vw] ',
                      'max-xsm:w-screen '
                    )}
                  >
                    <ReactPlayer
                      loop
                      muted
                      playing
                      width="100%"
                      height="100%"
                      controls={false}
                      url={item.videos}
                      config={{
                        youtube: {
                          playerVars: {
                            rel: 0,
                            showinfo: 0,
                            disablekb: 1,
                            modestbranding: 1,
                          },
                        },
                      }}
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      'xl:w-[25vw] relative aspect-video -z-10 ',
                      'md:w-[33.3vw] ',
                      'max-sm:w-[50vw] ',
                      'max-xsm:w-screen '
                    )}
                  >
                    {item.photos && item.photos.length > 0 && (
                      <ImageLoop images={item.photos} />
                    )}
                  </div>
                )}
                <div
                  className={cn(
                    cachedTheme?.bg,
                    cachedTheme?.textColor,
                    cachedTheme?.borderColor,
                    'xl:w-[25vw] grid grid-rows-2 grid-cols-2 gap-1 p-1 border-r-[1px] border-l-[1px] border-b-[1px] rounded-b-md',
                    'md:w-[33.3vw] ',
                    'max-sm:w-[50vw] ',
                    'max-xsm:w-screen '
                  )}
                >
                  <p
                    className={`row-span-1 col-span-1 text-xl `}
                    title={`Minimum Person : ${item.mincapacity}\nMaximum Person : ${item.maxcapacity}`}
                  >
                    <span className="flex items-center gap-1">
                      <CapacityIcon size={20} />
                      {item.mincapacity}-{item.maxcapacity}
                    </span>
                  </p>
                  <p
                    title={`${item.available ? 'Available' : 'Unavailable'}`}
                    className={`row-span-1 col-span-1 text-xl flex justify-end ${
                      item.available ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {item.available ? (
                      <span className="truncate">Available </span>
                    ) : (
                      <span className="truncate">Unavailable</span>
                    )}
                  </p>
                  <p
                    className="row-span-1 col-span-1 text-xl"
                    title={`Rs.${item.price}/month`}
                  >
                    <span className="flex items-center gap-1">
                      <PriceIcon size={20} />
                      Rs.{item.price}
                    </span>
                  </p>
                  <p
                    title={`Posted By : ${item.postedBy}${
                      item.verified ? ' (Verified)' : ''
                    }`}
                    className={`row-span-1 col-span-1 text-xl flex justify-end`}
                  >
                    👤 {item.postedBy}
                  </p>
                  <p
                    title={`${item.roomtype}`}
                    className={`row-span-1 col-span-1 text-xl`}
                  >
                    🏘️ {item.roomtype}
                  </p>
                  <p
                    title={`${item.furnishingStatus}`}
                    className={`row-span-1 col-span-1 text-xl flex justify-end items-center gap-1`}
                  >
                    <FurnishIcon /> {item.furnishingStatus}
                  </p>
                  <p
                    title={`${item.location} (${item.direction})`}
                    className={`row-span-1 col-span-2 text-xl flex justify-start `}
                  >
                    <span className="flex items-center gap-1 truncate ">
                      📌 {item.location}
                      {item.direction ? ` (${item.direction})` : ''}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
          <div
            ref={observerRef}
            className="h-1 border-2 border-transparent"
          ></div>
          {isFetchingNextPage && (
            <div className="flex justify-center items-center">
              <div
                className={cn(
                  cachedTheme?.activeBg,
                  'w-8 h-8 border-4 border-t-transparent rounded-full animate-spin'
                )}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCardLayout;
