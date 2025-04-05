'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

import {
  useSearchData,
  useThemeState,
} from '@/app/providers/reactqueryProvider';
import { cn } from '@/app/lib/utils/tailwindMerge';
import NewRoomDetails from '@/app/lib/ui/NewRoomDetails';
import { NewListedRoom, RoomData } from '@/app/types/types';
import ResponsiveNewRoomDetails from '@/app/lib/ui/ResponsiveNewRoomDetails';

const VideoPlayer = dynamic(() => import('@/app/lib/ui/VideoPlayer'), {
  ssr: false,
  loading: () => <VideoSkeleton />,
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

  // const cityRoomDetails =
  //   roomDetails &&
  //   queryClient.getQueryData<InfiniteData<RoomData[]>>([
  //     `room${roomDetails.city}`,
  //   ]);
  if (!roomDetails) return null;
  return (
    <div className="flex flex-col ">
      <div className="flex max-xsm:flex-col gap-1 p-2 relative max-xsm:p-0 max-xsm:gap-0 ">
        <Suspense fallback={<VideoSkeleton />}>
          <VideoPlayer videoUrl={roomDetails.videos} />
        </Suspense>
        <NewRoomDetails roomCardDetails={roomDetails as NewListedRoom} />
      </div>
      <ResponsiveNewRoomDetails
        roomCardDetails={roomDetails as NewListedRoom}
      />
      <div
        className={cn(
          cacheTheme?.textColor,
          'flex justify-center text-lg font-semibold p-1'
        )}
      >
        Room Images
      </div>
      <ImageSlider imagesUrl={roomDetails.photos as string[]} />
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
