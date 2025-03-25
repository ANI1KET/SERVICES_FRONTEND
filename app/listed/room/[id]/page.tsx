'use client';

import { useParams } from 'next/navigation';

import { NewListedRoom } from '@/app/types/types';
import VideoPlayer from '@/app/lib/ui/VideoPlayer';
import ImageSlider from '../../../lib/ui/ImageSlider';
import { fetchNewRoomDetails } from '../../ServerAction';
import NewRoomDetails from '../../../lib/ui/NewRoomDetails';
import { decodeURLPlaceQuery } from '@/app/lib/utils/decodeURL';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ResponsiveNewRoomDetails from '../../../lib/ui/ResponsiveNewRoomDetails';

const Room = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const roomId = params?.id ? decodeURLPlaceQuery(params.id as string) : null;

  const {
    data: newRoomDetails,
    isLoading,
    error,
  } = useQuery<NewListedRoom>({
    queryKey: ['CategoryDetails', 'room'],
    queryFn: () =>
      roomId
        ? fetchNewRoomDetails('room', roomId)
        : Promise.reject('No room ID'),
    enabled: !!roomId,
    staleTime: 1000 * 60 * 10,
    initialData: () =>
      queryClient.getQueryData<NewListedRoom>(['CategoryDetails', 'room']),
  });

  if (!newRoomDetails) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching room details.</div>;
  return (
    <div className="flex flex-col ">
      <div className="flex max-xsm:flex-col gap-1 p-2 relative mb-5 max-xsm:p-0 max-xsm:gap-0 ">
        <VideoPlayer videoUrl={newRoomDetails?.videos} />

        <NewRoomDetails roomCardDetails={newRoomDetails as NewListedRoom} />
      </div>

      <ResponsiveNewRoomDetails
        roomCardDetails={newRoomDetails as NewListedRoom}
      />

      <div className="flex justify-center text-lg font-semibold p-1">
        Room Images
      </div>

      <ImageSlider imagesUrl={newRoomDetails?.photos as string[]} />
    </div>
  );
};

export default Room;

//   const images: string[] = [
//     'https://drive.google.com/uc?export=view&id=1VM97XOiPOQ9IE-0V-XeFDXmAdWNzHUHs',
//     //       'https://drive.google.com/uc?id=1AU27PtVetlQ0pZaRz9TEJ9YaTSenSOuL',
//     // //     'https://drive.google.com/thumbnail?id=1AU27PtVetlQ0pZaRz9TEJ9YaTSenSOuL',
//   ];
