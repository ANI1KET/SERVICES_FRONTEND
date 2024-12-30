export const decodeURLPlaceQuery = (query: string) => {
  try {
    return atob(query);
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return null;
  }
};

export default async function SelectedHostel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hostelId = id ? decodeURLPlaceQuery(id) : null;

  return <div>{hostelId}</div>;
}
