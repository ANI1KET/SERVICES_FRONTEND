import { notFound } from 'next/navigation';

import { decodeURLPlaceQuery } from '@/app/lib/utils/decodeURL';

export default async function SelectedLand({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const landId = id ? decodeURLPlaceQuery(id) : null;

  if (!landId) {
    notFound();
  }

  return <div>{'landId'}</div>;
}
