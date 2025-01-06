import { RoomData } from '@/app/types/types';
import { decodeURLPlaceQuery, getCategoryDetails } from '../../ServerAction';

export default async function SelectedRoom({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const roomId = id ? decodeURLPlaceQuery(id) : null;

  try {
    if (!roomId) {
      throw new Error('Invalid room ID');
    }

    // const selectedRoomData:RoomData = await getCategoryDetails({
    //   id: roomId,
    //   category: 'room',
    // });
    // console.log(selectedRoomData);

    const selectedRoomData: RoomData = {
      id: '673fa7cab2b04a52dd59d803',
      mincapacity: 2,
      maxcapacity: 5,
      price: 1200,
      name: 'Sunrise Apartment',
      roomNumber: 'A10ef10',
      city: 'Pokhara',
      location: 'Pokhara B',
      direction: null,
      videos: 'https://example.com/videos/room1.mp4',
      photos: ['https://example.com/images/room1.jpg'],
      ratings: 0,
      available: true,
      postedBy: 'USER',
      verified: false,
      roomtype: 'TWO_BHK',
      furnishingStatus: 'FURNISHED',
      amenities: [],
      userId: '675f402b43be46be73fb7b15',
      createdAt: '2024-11-21T21:36:10.489Z',
      updatedAt: '2024-11-21T21:36:10.489Z',
      roomReviews: [],
      user: { role: 'USER' },
    };
  } catch (error) {
    console.error('Error fetching Room Data:', error);
    return <p key="error">Error loading Room data</p>;
  }

  return <div>{roomId}</div>;
}
