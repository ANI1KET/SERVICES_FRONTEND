import { notFound } from 'next/navigation';

import { decodeURLPlaceQuery } from '@/app/lib/utils/decodeURL';

export default async function SelectedHostel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hostelId = id ? decodeURLPlaceQuery(id) : null;

  if (!hostelId) {
    notFound();
  }

  return <div>{hostelId}</div>;
}
