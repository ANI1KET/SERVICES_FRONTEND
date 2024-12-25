'use client';

import { useParams } from 'next/navigation';

import ImageSlider from '../../../lib/ui/ImageSlider';
import { useGetNewRoomDetails } from '@/app/providers/reactqueryProvider';
import VideoPlayer from '@/app/lib/ui/VideoPlayer';

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
  console.log(newRoomDetails);

  const images: string[] = [
    'https://drive.google.com/uc?export=view&id=1VM97XOiPOQ9IE-0V-XeFDXmAdWNzHUHs',
    'https://drive.google.com/uc?export=view&id=1ii3RevE0dm7O2R_L6QSmrwMbUi2Cxat-',
    'https://drive.google.com/uc?export=view&id=1cc2PgZjeOIVx2g9nrmhNfzi4s7OkCohV',
    'https://drive.google.com/uc?export=view&id=1_b5NCiPWEs3yphzlwkWFVxLesliUV0aa',
    'https://drive.google.com/uc?export=view&id=1ZCJeIeTxDvU80pW7Rgc6wZa159QKL3Ze',
    'https://drive.google.com/uc?export=view&id=1o7e63HTFP5AMuW8ebUwPh_-hBKqB8zEB',
    'https://drive.google.com/uc?export=view&id=1zcRjRVvurV7TPk13gLkxM62N_ZUqOC3d',
    //     'https://drive.google.com/uc?export=view&id=1lE7VKT0SD0WyleTPrFWAO0fgYcLDID1-',
    //     'https://drive.google.com/uc?export=view&id=154xdUKqZ06bwP5LzeCrNEGZ9oo2eQl3g',
    //     'https://drive.google.com/uc?export=view&id=1L05uQEwH6Y9hY4nLcQkYD-azWe2WJ1gv',
    //     'https://drive.google.com/uc?export=view&id=1Iy9IFeGaK3SOP_K4rHWmfHfh-FlFOxrq',
    //       'https://drive.google.com/uc?export=view&id=1AU27PtVetlQ0pZaRz9TEJ9YaTSenSOuL',
    //       'https://drive.google.com/uc?export=view&id=1Iy9IFeGaK3SOP_K4rHWmfHfh-FlFOxrq',
    //       'https://drive.google.com/uc?export=view&id=1AU27PtVetlQ0pZaRz9TEJ9YaTSenSOuL',
    // //     'https://lh3.googleusercontent.com/d/1lE7VKT0SD0WyleTPrFWAO0fgYcLDID1-',
    // //     'https://lh3.googleusercontent.com/d/154xdUKqZ06bwP5LzeCrNEGZ9oo2eQl3g',
    // //     'https://lh3.googleusercontent.com/d/1L05uQEwH6Y9hY4nLcQkYD-azWe2WJ1gv',
    // //     'https://lh3.googleusercontent.com/d/1Iy9IFeGaK3SOP_K4rHWmfHfh-FlFOxrq',
    // //     'https://lh3.googleusercontent.com/d/1AU27PtVetlQ0pZaRz9TEJ9YaTSenSOuL',
    // //     'https://lh3.googleusercontent.com/d/1Iy9IFeGaK3SOP_K4rHWmfHfh-FlFOxrq',
    // //     'https://lh3.googleusercontent.com/d/1AU27PtVetlQ0pZaRz9TEJ9YaTSenSOuL',
    // //     'https://drive.google.com/thumbnail?id=1lE7VKT0SD0WyleTPrFWAO0fgYcLDID1-',
    // //     'https://drive.google.com/thumbnail?id=154xdUKqZ06bwP5LzeCrNEGZ9oo2eQl3g',
    // //     'https://drive.google.com/thumbnail?id=1L05uQEwH6Y9hY4nLcQkYD-azWe2WJ1gv',
    // //     'https://drive.google.com/thumbnail?id=1Iy9IFeGaK3SOP_K4rHWmfHfh-FlFOxrq',
    // //     'https://drive.google.com/thumbnail?id=1AU27PtVetlQ0pZaRz9TEJ9YaTSenSOuL',
  ];

  const videos: string = 'https://www.youtube.com/embed/JWLsQ8oM8MY';
  return (
    <div className="flex flex-col ">
      <VideoPlayer videoUrl={newRoomDetails?.videos as string} />
      {/* <VideoPlayer videoUrl={videos as string} /> */}
      <ImageSlider imagesUrl={newRoomDetails?.photos as string[]} />
      {/* <ImageSlider imagesUrl={images as string[]} /> */}
    </div>
  );
};

export default Room;
