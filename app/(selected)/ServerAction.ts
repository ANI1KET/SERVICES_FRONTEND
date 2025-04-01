'use server';

import axiosInstance from '../lib/utils/axiosInstance';

export const updateNumber = async ({
  userId,
  number,
}: {
  userId: string;
  number: string;
}): Promise<string> => {
  'use server';

  try {
    const response = await axiosInstance.post(
      `/user/number`,
      { userId, number },
      {
        headers: { 'Cache-Control': 'no-cache' },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return 'Failed';
  }
};
