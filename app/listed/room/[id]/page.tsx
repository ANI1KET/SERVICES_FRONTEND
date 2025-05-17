'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { ListedRoom } from '@/app/types/types';
import { fetchNewRoomDetails } from '../../ServerAction';
import { decodeURLPlaceQuery } from '@/app/lib/utils/decodeURL';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import NewRoomDetails from '@/app/components/ReUsable/NewRoomDetails';
import ResponsiveNewRoomDetails from '@/app/components/ReUsable/ResponsiveRoomDetails';

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

const Room = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const roomId = params?.id ? decodeURLPlaceQuery(params.id as string) : null;

  const dataFromCache = queryClient.getQueryData<ListedRoom>([
    'CategoryDetails',
    'room',
  ]);

  const {
    error,
    isLoading,
    data: newRoomDetails,
  } = useQuery<ListedRoom>({
    queryKey: ['CategoryDetails', 'room'],
    queryFn: () =>
      roomId ? fetchNewRoomDetails(roomId) : Promise.reject('No room ID'),
    enabled: !!roomId && !dataFromCache,
    staleTime: 1000 * 60 * 10,
    initialData: dataFromCache,
  });

  if (!newRoomDetails) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching room details.</div>;
  return (
    <div className="flex flex-col ">
      <div className="flex max-xsm:flex-col gap-1 p-2 relative mb-5 max-xsm:p-0 max-xsm:gap-0 ">
        <Suspense fallback={<div>Loading video...</div>}>
          <VideoPlayer videoUrl={newRoomDetails.videos} />
        </Suspense>
        <NewRoomDetails roomCardDetails={newRoomDetails} />
      </div>

      <ResponsiveNewRoomDetails roomCardDetails={newRoomDetails} />

      <div className="flex justify-center text-lg font-semibold p-1">
        Room Images
      </div>

      <ImageSlider imagesUrl={newRoomDetails?.photos as string[]} />
    </div>
  );
};

export default Room;
