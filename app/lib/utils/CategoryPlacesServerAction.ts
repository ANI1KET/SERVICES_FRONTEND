'use server';

import { AxiosError } from 'axios';
// import { cookies } from 'next/headers';
// import { headers } from 'next/headers';

import axiosInstance from './axiosInstance';
import { PAGE_SIZE } from '../reusableConst';

export async function getCategoryCitiesLocationDetails({
  category,
  offset = 0,
}: {
  offset: number;
  category: string;
}) {
  'use server';

  // const cookieStore = await cookies();
  // console.log('1 ', cookieStore);
  // const requestHeaders = await headers();
  // console.log(Object.fromEntries(requestHeaders));

  try {
    const response = await axiosInstance.get(`/place/data/${category}`, {
      params: {
        offset,
        limit: PAGE_SIZE,
      },
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.error;
    }
    throw error;
  }
}

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

type CityLocationsData = {
  [key: string]: string[];
};

function transformCategoryCityLocationsResponse(
  city: string,
  responseData: { location: string }[]
): CityLocationsData {
  const cityLocationsData = responseData.map(
    (cityLocation) => cityLocation.location
  );

  return { [city]: cityLocationsData };
}

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

    const transformedResponseData: CityLocationsData =
      transformCategoryCityLocationsResponse(city, response.data);

    return transformedResponseData;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.error;
    }
    throw error;
  }
}
