'use client';

import {
  useQuery,
  InfiniteData,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Suspense, useCallback, useEffect, useRef } from 'react';

import {
  useThemeState,
  useGetRoomSearchData,
} from '@/app/providers/reactqueryProvider';
import { cn } from '@/app/lib/utils/tailwindMerge';
import RoomDetails from '../../ReUsable/RoomDetails';
import { PAGE_SIZE } from '../../../lib/reusableConst';
import { ListedRoom, RoomData } from '@/app/types/types';
import NewRoomDetails from '@/app/components/ReUsable/NewRoomDetails';
import { fetchSelectedRoomDetails } from '@/app/(selected)/ServerAction';
import ResponsiveNewRoomDetails from '@/app/components/ReUsable/ResponsiveRoomDetails';
import { getCategoryDetails } from '@/app/components/HomeLayouts/LowerLayout/ServerAction';

const VideoPlayer = dynamic(
  () => import('@/app/components/ReUsable/VideoPlayer'),
  {
    ssr: false,
  }
);
const ImageSlider = dynamic(
  () => import('@/app/components/ReUsable/ImageSlider'),
  {
    ssr: false,
  }
);

const findMatchingRoom = (
  cachedData: { pages: RoomData[][] } | undefined,
  roomId: string
): RoomData | undefined => {
  if (!cachedData?.pages) return undefined;

  for (const page of cachedData.pages) {
    const matchingRoom = page.find((room) => room.id === roomId);
    if (matchingRoom) return matchingRoom;
  }

  return undefined;
};

const RoomDetailsLayout: React.FC<{ city?: string; roomId: string }> = ({
  city,
  roomId,
}) => {
  const cacheTheme = useThemeState();
  const queryClient = useQueryClient();
  const searchData = useGetRoomSearchData();

  const cachedData = city
    ? queryClient.getQueryData<InfiniteData<RoomData[]>>([`room${city}`])
    : (() => {
        if (!searchData) return undefined;
        return queryClient.getQueryData<InfiniteData<RoomData[]>>([
          'search/room',
          searchData,
        ]);
      })();

  const roomDetails = findMatchingRoom(cachedData, roomId);

  const { data: fallbackRoomDetails, isFetching } = useQuery<ListedRoom>({
    queryKey: ['selectedRoom', roomId],
    queryFn: () => fetchSelectedRoomDetails(roomId),
    enabled: !roomDetails,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const finalRoomDetails = roomDetails || fallbackRoomDetails;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`room${finalRoomDetails?.city}`],
      queryFn: ({ pageParam = 0 }) =>
        getCategoryDetails({
          category: 'room',
          offset: pageParam,
          city: finalRoomDetails?.city as string,
        }),
      getNextPageParam: (lastPage, allPages) => {
        const currentOffset = allPages.length * PAGE_SIZE;
        return lastPage.length === PAGE_SIZE ? currentOffset : undefined;
      },
      initialPageParam: 0,
      gcTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 10,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!finalRoomDetails?.city,
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

  if (isFetching)
    return (
      <div className="w-full flex justify-center items-center">
        <div
          className={cn(
            cacheTheme?.activeBg,
            'w-8 h-8 border-4 border-t-transparent rounded-full animate-spin'
          )}
        ></div>
      </div>
    );
  if (!finalRoomDetails)
    return (
      <div className="w-full flex justify-center items-center">
        Room Not Found
      </div>
    );
  return (
    <div className="flex flex-col ">
      <div className="flex max-xsm:flex-col gap-1 p-2 relative max-xsm:p-0 max-xsm:gap-0 ">
        <Suspense fallback={<VideoSkeleton />}>
          <VideoPlayer videoUrl={finalRoomDetails.videos} />
        </Suspense>
        <NewRoomDetails roomCardDetails={finalRoomDetails as ListedRoom} />
      </div>
      <ResponsiveNewRoomDetails
        roomCardDetails={finalRoomDetails as ListedRoom}
      />

      <div
        className={cn(
          cacheTheme?.textColor,
          'flex justify-center text-lg font-semibold p-1'
        )}
      >
        Room Images
      </div>

      <ImageSlider imagesUrl={finalRoomDetails.photos as string[]} />

      <div className={'mt-5 '}>
        <p
          className={cn(
            cacheTheme.borderColor,
            'text-xl text-center font-semibold p-1 border rounded-t-xl'
          )}
        >
          Similar Rooms in {finalRoomDetails.city}
        </p>

        <RoomDetails
          observerRef={observerRef}
          city={finalRoomDetails.city as string}
          isFetchingNextPage={isFetchingNextPage}
          data={data?.pages as RoomData[][] | undefined}
        />
      </div>
    </div>
  );
};

export default RoomDetailsLayout;

const VideoSkeleton = () => (
  <div
    className={cn(
      'relative w-[45vw] max-xsm:w-screen aspect-video border animate-pulse bg-gray-600 border-black'
    )}
  ></div>
);
