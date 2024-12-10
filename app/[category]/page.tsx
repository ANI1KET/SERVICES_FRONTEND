import axios from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { QueryFilters } from '../types/types';
import CityLocationsData from './CityLocationsData';
import axiosInstance from '../lib/utils/axiosInstance';
import LoadMoreCityLocations from './LoadMoreCityLocations';

const PAGE_SIZE = 2;

export const metadata: Metadata = {
  title: 'Category Page',
};

const decodeURLPlaceQuery = (query: string) => {
  try {
    return JSON.parse(atob(query));
  } catch (error) {
    console.error('Error decoding query parameter:', error);
    return null;
  }
};

const getCityLocations = async ({
  category,
  offset = 0,
  decodedCity,
  decodedLocations,
  decodedURLQueryFilters,
}: {
  offset: number;
  category: string;
  decodedCity: string;
  decodedLocations: string[];
  decodedURLQueryFilters: QueryFilters;
}) => {
  try {
    const response = await axiosInstance.get(`/place/${category}`, {
      params: {
        offset,
        limit: PAGE_SIZE,
        city: decodedCity,
        locations: decodedLocations,
        filters: decodedURLQueryFilters,
      },
      headers: { 'Cache-Control': 'no-cache' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

const Category = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ place: string; filters: string }>;
}) => {
  const { category } = await params;
  const { place, filters } = await searchParams;

  const decodedURLPlaceQuery = place ? decodeURLPlaceQuery(place) : null;
  if (!decodedURLPlaceQuery) notFound();

  const decodedURLQueryFilters: QueryFilters = filters
    ? decodeURLPlaceQuery(filters)
    : null;

  try {
    const initialCityLocationsData = await getCityLocations({
      category,
      offset: 0,
      decodedCity: decodedURLPlaceQuery.city,
      decodedURLQueryFilters: decodedURLQueryFilters,
      decodedLocations: decodedURLPlaceQuery.locations,
    });
    const loadMoreCityLocations = async ({ offset }: { offset: number }) => {
      'use server';

      try {
        const cityLocationsData = await getCityLocations({
          offset,
          category,
          decodedCity: decodedURLPlaceQuery.city,
          decodedURLQueryFilters: decodedURLQueryFilters,
          decodedLocations: decodedURLPlaceQuery.locations,
        });

        const nextOffset =
          cityLocationsData.length >= PAGE_SIZE ? offset + PAGE_SIZE : null;

        return [
          <CityLocationsData
            cityLocationsData={cityLocationsData}
            key={offset}
          />,
          nextOffset,
        ] as const;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return [
            <>{error.response?.data.message || 'Error loading data'}</>,
            null,
          ] as const;
        }
        return [<p key="error">Error loading data</p>, null] as const;
      }
    };

    return (
      <section className="">
        <h1 className="text-center font-medium m-1">
          {category.toUpperCase()}s in{' '}
          {decodedURLPlaceQuery.city?.toUpperCase()}
        </h1>
        <LoadMoreCityLocations
          loadMoreCityLocationsAction={loadMoreCityLocations}
          initialOffset={
            initialCityLocationsData.length >= PAGE_SIZE ? PAGE_SIZE : null
          }
          enncodedPlaceURL={place}
          URLQueryFilters={decodedURLQueryFilters}
        >
          <CityLocationsData cityLocationsData={initialCityLocationsData} />
        </LoadMoreCityLocations>
      </section>
    );
  } catch (error) {
    notFound();
    console.error('Error fetching initial data:', error);
  }
};

export default Category;
