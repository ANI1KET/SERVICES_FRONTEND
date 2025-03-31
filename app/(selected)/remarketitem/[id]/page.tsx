import { notFound } from 'next/navigation';

import { decodeURLPlaceQuery } from '../../ServerAction';

export default async function SelectedReMarketItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const remarketitemId = id ? decodeURLPlaceQuery(id) : null;

  if (!remarketitemId) {
    notFound();
  }

  return <div>{'repairId'}</div>;
}
