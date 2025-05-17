import { notFound } from 'next/navigation';

import PropertyDetailsLayout from '@/app/components/Selected/property/PropertyDetailsLayout';

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

export default async function SelectedProperty({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const propertyDetails = id ? decodeURLPlaceQuery(id) : null;

  if (!propertyDetails) {
    notFound();
  }

  const city = propertyDetails.city;
  const propertyId = propertyDetails.id;
  return (
    <PropertyDetailsLayout
      city={city}
      propertyId={propertyId}
    ></PropertyDetailsLayout>
  );
}
