import { notFound } from 'next/navigation';

import { decodeURLPlaceQuery } from '../../ServerAction';
import RoomDetailsLayout from '../../../lib/ui/RoomDetailsLayout';

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

  return (
    <div>
      <RoomDetailsLayout city={city} roomId={roomId}></RoomDetailsLayout>
    </div>
  );
}
