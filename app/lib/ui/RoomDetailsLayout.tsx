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
  useSearchData,
  useThemeState,
} from '@/app/providers/reactqueryProvider';
import RoomDetails from './RoomDetails';
import { PAGE_SIZE } from '../reusableConst';
import { cn } from '@/app/lib/utils/tailwindMerge';
import NewRoomDetails from '@/app/lib/ui/NewRoomDetails';
import { NewListedRoom, RoomData } from '@/app/types/types';
import { fetchSelectedRoomDetails } from '@/app/(selected)/ServerAction';
import ResponsiveNewRoomDetails from '@/app/lib/ui/ResponsiveNewRoomDetails';
import { getCategoryDetails } from '@/app/components/HomeLayouts/LowerLayout/ServerAction';

const VideoPlayer = dynamic(() => import('@/app/lib/ui/VideoPlayer'), {
  ssr: false,
});
const ImageSlider = dynamic(() => import('@/app/lib/ui/ImageSlider'), {
  ssr: false,
});

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
  const searchData = useSearchData();
  const queryClient = useQueryClient();

  const cachedData = city
    ? queryClient.getQueryData<InfiniteData<RoomData[]>>([`room${city}`])
    : (() => {
        if (!searchData) return undefined;
        return queryClient.getQueryData<InfiniteData<RoomData[]>>([
          'search/room',
          searchData.city,
          searchData.filters,
        ]);
      })();

  const roomDetails = findMatchingRoom(cachedData, roomId);

  const { data: fallbackRoomDetails } = useQuery<NewListedRoom>({
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

  if (!finalRoomDetails) return null;
  return (
    <div className="flex flex-col ">
      <div className="flex max-xsm:flex-col gap-1 p-2 relative max-xsm:p-0 max-xsm:gap-0 ">
        <Suspense fallback={<VideoSkeleton />}>
          <VideoPlayer videoUrl={finalRoomDetails.videos} />
        </Suspense>
        <NewRoomDetails roomCardDetails={finalRoomDetails as NewListedRoom} />
      </div>
      <ResponsiveNewRoomDetails
        roomCardDetails={finalRoomDetails as NewListedRoom}
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
          data={data?.pages}
          observerRef={observerRef}
          city={finalRoomDetails.city as string}
          isFetchingNextPage={isFetchingNextPage}
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
