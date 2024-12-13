'use server';

import SearchForm from './LowerSearchBox/SearchForm';
import axiosInstance from '@/app/lib/utils/axiosInstance';

type ResponseData = {
  city: string;
  cities: { city: string }[];
  cityLocations: { location: string }[];
};

type CitiesLocationsData = {
  [key: string]:
    | {
        [key: string]: string[];
      }
    | string;
  city: string;
};

function transformCategoryCitiesLocationsResponse(
  responseData: ResponseData,
  category: string
): CitiesLocationsData {
  const citiesLocationsData = responseData.cities.reduce((acc, { city }) => {
    if (city === responseData.city) {
      acc[city] = responseData.cityLocations.map((loc) => loc.location);
    } else {
      acc[city] = [];
    }

    return acc;
  }, {} as { [key: string]: string[] });

  return { [category]: citiesLocationsData, city: responseData.city };
}

export async function getCategoryCitiesLocations({
  category,
}: {
  category: string;
}) {
  'use server';
  try {
    const response = await axiosInstance.get(
      `/place/cities-locations?category=${category}`
    );

    const transformedResponseData: CitiesLocationsData =
      transformCategoryCitiesLocationsResponse(response.data, category);

    return transformedResponseData;
  } catch (error: any) {
    throw error.response.data.error;
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
}) {
  'use server';
  try {
    const response = await axiosInstance.get(
      `/place/city-locations?category=${category}&city=${city}`
    );

    const transformedResponseData: CityLocationsData =
      transformCategoryCityLocationsResponse(city, response.data);

    return transformedResponseData;
  } catch (error: any) {
    throw error.response.data.error;
  }
}

const LowerSearchBox: React.FC = () => {
  return <SearchForm />;
};

export default LowerSearchBox;
