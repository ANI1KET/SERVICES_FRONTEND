import { notFound } from 'next/navigation';
import { decodeURLPlaceQuery } from '../../ServerAction';

export default async function SelectedRestaurent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurentId = id ? decodeURLPlaceQuery(id) : null;

  if (!restaurentId) {
    notFound();
  }

  return <div>{'restaurentId'}</div>;
}
