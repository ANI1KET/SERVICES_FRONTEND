import { notFound } from 'next/navigation';

import RoomDetailsLayout from '../../../components/Selected/room/RoomDetailsLayout';

const decodeURLPlaceQuery = (query: string): Record<string, string> => {
  try {
    const urlDecoded = decodeURIComponent(query);
    const decoded = atob(urlDecoded);
    const [id, city] = decoded.split(',');

    return { id, city };
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return {};
  }
};

export default async function SelectedRoom({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const roomDetails = id ? decodeURLPlaceQuery(id) : null;

  if (!roomDetails) {
    notFound();
  }

  const city = roomDetails.city;
  const roomId = roomDetails.id;
  return <RoomDetailsLayout city={city} roomId={roomId}></RoomDetailsLayout>;
}
