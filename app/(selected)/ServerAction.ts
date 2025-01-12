// import axiosInstance from '../lib/utils/axiosInstance';

export const decodeURLPlaceQuery = (query: string) => {
  try {
    const urlDecoded = decodeURIComponent(query);
    const decoded = atob(urlDecoded);
    const [id, city] = decoded.split(',');

    return { id, city };
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return null;
  }
};

// export const getCategoryDetails = async ({
//   id,
//   category,
// }: {
//   id: string;
//   category: string;
// }) => {
//   const response = await axiosInstance.get(`/${category}/${id}`, {
//     headers: { 'Cache-Control': 'no-cache' },
//   });

//   return response.data;
// };
