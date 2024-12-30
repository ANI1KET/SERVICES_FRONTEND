import axiosInstance from '../lib/utils/axiosInstance';

export const decodeURLPlaceQuery = (query: string) => {
  try {
    return atob(query);
  } catch (error) {
    // console.error('Error decoding query parameter:', error);
    return null;
  }
};

export const getCategoryDetails = async ({
  id,
  category,
}: {
  id: string;
  category: string;
}) => {
  const response = await axiosInstance.get(`/${category}/${id}`, {
    headers: { 'Cache-Control': 'no-cache' },
  });

  return response.data;
};
