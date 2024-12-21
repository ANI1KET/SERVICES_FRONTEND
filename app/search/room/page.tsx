import axios from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { QueryFilters } from '@/app/types/types';
import CityLocationsData from './component/CityLocationsData';
import LoadMoreCityLocations from './component/LoadMoreCityLocations';
import { decodeURLPlaceQuery, getCityLocations } from '../ServerAction';

const PAGE_SIZE = 2;

export const metadata: Metadata = {
  title: 'Category Page',
};

export default async function Room({
  searchParams,
}: {
  searchParams: Promise<{ place: string; filters: string }>;
}) {
  const { place, filters } = await searchParams;

  const decodedURLPlaceQuery = place ? decodeURLPlaceQuery(place) : null;
  if (!decodedURLPlaceQuery) notFound();

  const decodedURLQueryFilters: QueryFilters = filters
    ? decodeURLPlaceQuery(filters)
    : null;

  try {
    const initialCityLocationsData = await getCityLocations({
      category: 'room',
      offset: 0,
      decodedCity: decodedURLPlaceQuery.city,
      decodedURLQueryFilters: decodedURLQueryFilters,
      decodedLocations: decodedURLPlaceQuery.locations,
    });

    const loadMoreCityLocations = async ({ offset }: { offset: number }) => {
      'use server';

      try {
        const cityLocationsData = await getCityLocations({
          category: 'room',
          offset,
          decodedCity: decodedURLPlaceQuery.city,
          decodedURLQueryFilters: decodedURLQueryFilters,
          decodedLocations: decodedURLPlaceQuery.locations,
        });

        const nextOffset =
          cityLocationsData.length >= PAGE_SIZE ? offset + PAGE_SIZE : null;

        return [
          <CityLocationsData
            key={offset}
            category={'room'}
            cityLocationsData={cityLocationsData}
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
          Rooms in
          {decodedURLPlaceQuery.city?.toUpperCase()}
        </h1>
        <LoadMoreCityLocations
          loadMoreCityLocations={loadMoreCityLocations}
          initialOffset={
            initialCityLocationsData.length >= PAGE_SIZE ? PAGE_SIZE : null
          }
          enncodedPlaceURL={place}
          URLQueryFilters={decodedURLQueryFilters}
        >
          <CityLocationsData
            category={'room'}
            cityLocationsData={initialCityLocationsData}
          />
        </LoadMoreCityLocations>
      </section>
    );
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return <p key="error">Error loading data</p>;
    // notFound();
  }
}
