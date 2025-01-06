'use client';

import { useParams } from 'next/navigation';

import { NewListedRoom } from '@/app/types/types';
import VideoPlayer from '@/app/lib/ui/VideoPlayer';
import ImageSlider from '../../../lib/ui/ImageSlider';
import NewRoomDetails from './component/NewRoomDetails';
import { useGetNewRoomDetails } from '@/app/providers/reactqueryProvider';
import ResponsiveNewRoomDetails from './component/ResponsiveNewRoomDetails';

const decodeURLPlaceQuery = (query: string) => {
  try {
    return atob(query);
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return null;
  }
};

const Room = () => {
  const params = useParams();
  const id = params.id;
  const roomId = decodeURLPlaceQuery(id as string);

  //   const newRoomDetails = useGetNewRoomDetails('room');

  const newRoomDetails = {
    amenities: ['Parking , Wifi'],
    city: 'Biratnagar',
    direction: null,
    furnishingStatus: 'UNFURNISHED',
    id: '676c838c241fba50522de99b',
    location: 'Biratnagar A',
    maxcapacity: 3,
    mincapacity: 2,
    name: 'Aniket',
    photos: [
      'https://drive.google.com/uc?export=view&id=1DaKoZ1PIPn7P-ZwBeyATAz5p8XfOmEAT',
      'https://drive.google.com/uc?export=view&id=1V7uGBECIMCrEDMfDv4f7r0ND5vqgyBiy',
      'https://drive.google.com/uc?export=view&id=1nscU9Xy3K5RlJi0MmO5gf_71zZH4h-OR',
      'https://drive.google.com/uc?export=view&id=1YOJxKnuZoO9rQG8c-K93TiUDulMYLzgm',
      'https://drive.google.com/uc?export=view&id=1Q2AzDKr2vywlVmlmOp3QIlLkPlJgjj5O',
      'https://drive.google.com/uc?export=view&id=15cB-61xUoj46eOrDzlxwNgbn6_378zdl',
      'https://drive.google.com/uc?export=view&id=1HsjLbdgmKfzTY3KeRWnbICdUDX4TLBoM',
      'https://drive.google.com/uc?export=view&id=1EG4GPJ4sUVhwURRx0RY7FO59tSkhV7s3',
    ],
    available: true,
    postedBy: 'USER',
    price: 10000000.99,
    ratings: 0,
    roomNumber: '1111111111',
    roomtype: 'FLAT',
    userId: '674b5557b7a8725128d4250c',
    verified: true,
    videos: null,
    // videos:
    //   'https://www.youtube.com/embed/https://www.youtube.com/watch?v=lMeNzY5f8eQ',
    createdAt: 'Thu Dec 26 2024 03:43:32 GMT+0530 (India Standard Time)',
    updatedAt: 'Thu Dec 26 2024 03:43:32 GMT+0530 (India Standard Time)',
  };
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
