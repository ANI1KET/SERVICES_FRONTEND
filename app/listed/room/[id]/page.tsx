'use client';

import { useParams } from 'next/navigation';

import { useGetNewRoomDetails } from '@/app/providers/reactqueryProvider';
import ImageSlider from './ImageSlider';

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

  const newRoomDetails = useGetNewRoomDetails();

  const a: string[] = [
    'https://drive.google.com/uc?id=1lE7VKT0SD0WyleTPrFWAO0fgYcLDID1-',
    'https://drive.google.com/uc?id=154xdUKqZ06bwP5LzeCrNEGZ9oo2eQl3g',
    'https://drive.google.com/uc?id=1L05uQEwH6Y9hY4nLcQkYD-azWe2WJ1gv',
    //   'https://drive.google.com/uc?id=1Iy9IFeGaK3SOP_K4rHWmfHfh-FlFOxrq',
    //   'https://drive.google.com/uc?id=1AU27PtVetlQ0pZaRz9TEJ9YaTSenSOuL',
  ];
  //   const a: string[] = [
  //     'https://drive.google.com/thumbnail?id=1lE7VKT0SD0WyleTPrFWAO0fgYcLDID1-',
  //     'https://drive.google.com/thumbnail?id=154xdUKqZ06bwP5LzeCrNEGZ9oo2eQl3g',
  //     'https://drive.google.com/thumbnail?id=1L05uQEwH6Y9hY4nLcQkYD-azWe2WJ1gv',
  //     // 'https://drive.google.com/thumbnail?id=1Iy9IFeGaK3SOP_K4rHWmfHfh-FlFOxrq',
  //     // 'https://drive.google.com/thumbnail?id=1AU27PtVetlQ0pZaRz9TEJ9YaTSenSOuL',
  //   ];

  return (
    <div>
      rdtggd
      {/* <ImageSlider images={newRoomDetails?.photos as string[]} /> */}
      <ImageSlider images={a as string[]} />
    </div>
  );
};

export default Room;
