import { notFound } from 'next/navigation';

import { decodeURLPlaceQuery } from '../../ServerAction';

export default async function SelectedVehicel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicleId = id ? decodeURLPlaceQuery(id) : null;

  if (!vehicleId) {
    notFound();
  }

  return <div>{'rentalId'}</div>;
}
