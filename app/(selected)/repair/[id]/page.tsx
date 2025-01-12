import { notFound } from 'next/navigation';

import { decodeURLPlaceQuery } from '../../ServerAction';

export default async function SelectedRepair({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const repairId = id ? decodeURLPlaceQuery(id) : null;

  if (!repairId) {
    notFound();
  }

  return <div>{'repairId'}</div>;
}
