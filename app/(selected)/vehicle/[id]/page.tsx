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
