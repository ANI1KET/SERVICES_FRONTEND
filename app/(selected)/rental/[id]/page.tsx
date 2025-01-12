import { notFound } from 'next/navigation';

import { decodeURLPlaceQuery } from '../../ServerAction';

export default async function SelectedRental({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rentalId = id ? decodeURLPlaceQuery(id) : null;

  if (!rentalId) {
    notFound();
  }

  return <div>{'rentalId'}</div>;
}
