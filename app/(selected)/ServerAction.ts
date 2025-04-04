'use server';

import { cookies } from 'next/headers';

import axiosInstance from '../lib/utils/axiosInstance';

export const updateNumber = async ({
  userId,
  number,
}: {
  userId: string;
  number: string;
}): Promise<string> => {
  'use server';

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('next-auth.session-token')?.value;
  try {
    const response = await axiosInstance.post(
      `/user/number`,
      { userId, number },
      {
        headers: {
          Cookie: `next-auth.session-token=${sessionToken}`,
          'Cache-Control': 'no-cache',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return 'Failed';
  }
};
