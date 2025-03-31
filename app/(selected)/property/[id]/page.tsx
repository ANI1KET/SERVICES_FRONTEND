import { notFound } from 'next/navigation';

import { decodeURLPlaceQuery } from '@/app/lib/utils/decodeURL';

export default async function SelectedProperty({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const propertyId = id ? decodeURLPlaceQuery(id) : null;

  if (!propertyId) {
    notFound();
  }

  return <div>{'landId'}</div>;
}
