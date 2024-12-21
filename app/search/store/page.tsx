'use server';

const decodeURLPlaceQuery = (query: string) => {
  try {
    return atob(query);
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return null;
  }
};

const Store = async ({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) => {
  const { category, id } = await params;
  const categoryId = decodeURLPlaceQuery(id);

  return (
    <>
      <h1>Category: {category}</h1>
      <h2>Item ID: {categoryId}</h2>
    </>
  );
};

export default Store;
