'use client';

import ImageSlider from '@/app/lib/ui/ImageSlider';
import VideoPlayer from '@/app/lib/ui/VideoPlayer';
import { cn } from '@/app/lib/utils/tailwindMerge';
import NewRoomDetails from '@/app/lib/ui/NewRoomDetails';
import { NewListedRoom, RoomData } from '@/app/types/types';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import ResponsiveNewRoomDetails from '@/app/lib/ui/ResponsiveNewRoomDetails';

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

const RoomDetailsLayout: React.FC<{ city: string; roomId: string }> = ({
  city,
  roomId,
}) => {
  const cacheTheme = useThemeState();
  const queryClient = useQueryClient();

  const cachedData = city
    ? queryClient.getQueryData<InfiniteData<RoomData[]>>([`room${city}`])
    : queryClient.getQueryData<InfiniteData<RoomData[]>>([`search/room`]);

  const RoomDetails = findMatchingRoom(cachedData, roomId);
  if (!RoomDetails) return null;
  return (
    <div className="flex flex-col ">
      <div className="flex max-xsm:flex-col gap-1 p-2 relative max-xsm:p-0 max-xsm:gap-0 ">
        <VideoPlayer videoUrl={RoomDetails?.videos} />

        <NewRoomDetails roomCardDetails={RoomDetails as NewListedRoom} />
      </div>

      <ResponsiveNewRoomDetails
        roomCardDetails={RoomDetails as NewListedRoom}
      />

      <div
        className={cn(
          cacheTheme?.textColor,
          'flex justify-center text-lg font-semibold p-1'
        )}
      >
        Room Images
      </div>

      <ImageSlider imagesUrl={RoomDetails?.photos as string[]} />
    </div>
  );
};

export default RoomDetailsLayout;
