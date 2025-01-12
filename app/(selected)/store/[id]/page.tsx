import { decodeURLPlaceQuery } from '@/app/lib/utils/decodeURL';

export default async function SelectedStore({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const storeId = id ? decodeURLPlaceQuery(id) : null;

  return <div>{storeId}</div>;
}
