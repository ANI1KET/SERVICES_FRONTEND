import { notFound } from 'next/navigation';

const decodeURLPlaceQuery = (query: string): Record<string, string> => {
  try {
    const urlDecoded = decodeURIComponent(query);
    const decoded = atob(urlDecoded);
    const [id, city] = decoded.split(',');

    return { id, city };
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return {};
  }
};

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
