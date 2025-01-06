export const decodeURLPlaceQuery = (query: string) => {
  try {
    return atob(query);
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return null;
  }
};

export default async function SelectedRental({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rentalId = id ? decodeURLPlaceQuery(id) : null;

  return <div>{rentalId}</div>;
}
