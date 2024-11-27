import axios from "axios";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import axiosInstance from "../lib/utils/axiosInstance";
import LoadMoreCityLocations from "./LoadMoreCityLocations";
import CityLocationsData from "./CityLocationsData";

const PAGE_SIZE = 1;

export const metadata: Metadata = {
  title: "Category Page",
};

const decodeQueryParam = (param: string) => {
  try {
    return atob(param);
  } catch (error) {
    console.error("Error decoding query parameter:", error);
    return null;
  }
};

const getCityLocations = async ({
  category,
  decodedCity,
  decodedLocations,
  offset = 0,
}: {
  category: string;
  decodedCity: string | null;
  decodedLocations: string[] | undefined;
  offset: number;
}) => {
  try {
    const response = await axiosInstance.get(`/place/${category}`, {
      params: {
        city: decodedCity,
        locations: decodedLocations,
        limit: PAGE_SIZE,
        offset,
      },
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching city locations:", error);
    throw error;
  }
};

const Category = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { city: string; locations?: string };
}) => {
  const { category } = await params;
  const { city: encodedCity, locations: encodedLocations } = await searchParams;

  if (!encodedCity) notFound();

  const decodedCity = decodeQueryParam(encodedCity);
  const decodedLocations = encodedLocations
    ? decodeQueryParam(encodedLocations)?.split(",")
    : undefined;

  try {
    const initialCityLocationsData = await getCityLocations({
      category,
      decodedCity,
      decodedLocations,
      offset: 0,
    });

    const loadMoreCityLocations = async ({ offset }: { offset: number }) => {
      "use server";
      try {
        const cityLocationsData = await getCityLocations({
          category,
          decodedCity,
          decodedLocations,
          offset,
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
            <>{error.response?.data.message || "Error loading data"}</>,
            null,
          ] as const;
        }
        return [<p key="error">Error loading data</p>, null] as const;
      }
    };

    return (
      <main>
        <h1>Properties in {decodedCity}</h1>
        <LoadMoreCityLocations
          loadMoreCityLocationsAction={loadMoreCityLocations}
          initialOffset={PAGE_SIZE}
        >
          <CityLocationsData cityLocationsData={initialCityLocationsData} />
        </LoadMoreCityLocations>
      </main>
    );
  } catch (error) {
    notFound();
    console.error("Error fetching initial data:", error);
  }
};

export default Category;
