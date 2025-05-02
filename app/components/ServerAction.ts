'use server';

import { cookies } from 'next/headers';
import axiosInstance from '../lib/utils/axiosInstance';

export const getAutheticationHeader = async (): Promise<
  { headers: { Cookie: string; 'Cache-Control': string } } | undefined
> => {
  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get('__Secure-next-auth.session-token')?.value ||
    cookieStore.get('next-auth.session-token')?.value;

  return {
    headers: {
      Cookie: `next-auth.session-token=${sessionToken}`,
      'Cache-Control': 'no-cache',
    },
  };
};

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
      await getAutheticationHeader()
      // { ...(await getAutheticationHeader()) }
    );

    return response.data;
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return 'Failed';
  }
};
