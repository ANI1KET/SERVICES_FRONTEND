'use server';

import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { PAGE_SIZE } from '../lib/reusableConst';
import axiosInstance from '../lib/utils/axiosInstance';
import { unstable_cache, unstable_cacheTag } from 'next/cache';

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

export async function fetchCategoryCitiesLocationDetails() {
  unstable_cacheTag('category-city-location-details');

  const url = `${process.env.BASE_URL}/api/place/data?limit=${PAGE_SIZE}`;

  const res = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export const getCategoryCitiesLocationDetails = unstable_cache(
  fetchCategoryCitiesLocationDetails,
  ['category-city-location-details'],
  {
    revalidate: 300,
    tags: ['category-city-location-details'],
  }
);

// export async function getCategoryCitiesLocationDetails() {
//   'use server';

//   try {
//     const response = await axiosInstance.get(`/place/data?limit=${PAGE_SIZE}`, {
//       headers: {
//         'Cache-Control': 'no-cache',
//       },
//     });

//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       throw error.response?.data?.error;
//     }
//     throw error;
//   }
// }

export async function getCategoryCitiesLocations(
  city: string,
  category: string
) {
  'use server';

  try {
    const response = await axiosInstance.get(
      `/place/cities-locations/${category}`,
      {
        params: {
          city,
        },
        headers: {
          'Cache-Control': 'no-cache',
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.error;
    }
    throw error;
  }
}

//

export async function getCategoryCityLocations({
  city,
  category,
}: {
  city: string;
  category: string;
}): Promise<Record<string, string[]>> {
  'use server';

  try {
    const response = await axiosInstance.get(
      `/place/city-locations?category=${category}&city=${city}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.error;
    }
    throw error;
  }
}

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
