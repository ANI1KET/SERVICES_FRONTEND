'use client';

// import { useParams } from 'next/navigation';

import { NewListedRoom } from '@/app/types/types';
import VideoPlayer from '@/app/lib/ui/VideoPlayer';
import ImageSlider from '../../../lib/ui/ImageSlider';
import NewRoomDetails from '../../../lib/ui/NewRoomDetails';
import { useGetNewRoomDetails } from '@/app/providers/reactqueryProvider';
import ResponsiveNewRoomDetails from '../../../lib/ui/ResponsiveNewRoomDetails';

const Room = () => {
  // const params = useParams();
  // const id = params.id;
  // const roomId = decodeURLPlaceQuery(id as string);

  const newRoomDetails = useGetNewRoomDetails('room');
  if (!newRoomDetails) return null;

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
