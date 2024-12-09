"use client";

import { Slider } from "@nextui-org/slider";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

import {
  // CustomCheckbox,
  CustomCheckboxGroup,
} from "../lib/ui/FormReusableComponent";
import {
  PostedBy,
  RoomType,
  Aminities,
  QueryFilters,
  FurnishingStatus,
  DefaultQueryFilters,
} from "../types/types";

type LoadMoreCityLocationsProps = React.PropsWithChildren<{
  enncodedPlaceURL?: string;
  initialOffset: number | null;
  URLQueryFilters: QueryFilters;
  loadMoreCityLocationsAction: (params: {
    offset: number;
  }) => Promise<readonly [JSX.Element, number | null]>;
}>;

const LoadMoreCityLocations = ({
  children,
  initialOffset,
  URLQueryFilters,
  enncodedPlaceURL,
  loadMoreCityLocationsAction,
}: LoadMoreCityLocationsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [locations, setLocations] = useState<JSX.Element[]>([]);
  const [offset, setOffset] = useState<number | null>(initialOffset);

  const [queryFilters, setQueryFilters] = useState<DefaultQueryFilters>({
    postedBy: [],
    roomType: [],
    Amenities: [],
    Verified: false,
    capacityValue: [2, 3],
    ratingRange: [0, 5],
    furnishingStatus: [],
    priceRange: [0, 10000],
  });

  const handleLoadMore = useCallback(async () => {
    if (offset === null || loading) return;

    setLoading(true);

    const [newLocations, nextOffset] = await loadMoreCityLocationsAction({
      offset,
    });

    setLocations((prev) => [...prev, newLocations]);
    setOffset(nextOffset);
    setLoading(false);
  }, [offset, loading, loadMoreCityLocationsAction]);

  const updataURL = () => {
    const compressedURLQueryFilters = btoa(
      JSON.stringify({
        price: queryFilters.priceRange,
        rating: queryFilters.ratingRange,
        capacity: queryFilters.capacityValue,
        verified: queryFilters.Verified ? queryFilters.Verified : undefined,
        postedby:
          queryFilters.postedBy && queryFilters.postedBy.length
            ? queryFilters.postedBy
            : undefined,
        roomtype:
          queryFilters.roomType && queryFilters.roomType.length
            ? queryFilters.roomType
            : undefined,
        amenities:
          queryFilters.Amenities && queryFilters.Amenities.length
            ? queryFilters.Amenities
            : undefined,
        furnishingstatus:
          queryFilters.furnishingStatus && queryFilters.furnishingStatus.length
            ? queryFilters.furnishingStatus
            : undefined,
      })
    );
    router.push(
      `?place=${enncodedPlaceURL}&filters=${compressedURLQueryFilters}`,
      { scroll: true }
    );
  };

  useEffect(() => {
    const {
      price,
      rating,
      capacity,
      verified,
      postedby,
      roomtype,
      amenities,
      furnishingstatus,
    } = URLQueryFilters;

    if (initialOffset) {
      setOffset(initialOffset);
      setLocations([]);
    }

    setQueryFilters((prev) => ({
      ...prev,
      priceRange: price,
      ratingRange: rating,
      capacityValue: capacity,
      Verified: verified,
      postedBy: postedby,
      roomType: roomtype,
      Amenities: amenities,
      furnishingStatus: furnishingstatus,
    }));
  }, [URLQueryFilters, initialOffset]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleLoadMore]);
  return (
    <div className="grid gap-2 grid-cols-[3fr_5fr] max-sm:grid-cols-[2fr_2fr] max-xsm:grid-cols-[1fr] m-1 mb-6">
      <div className="h-fit sticky top-[13vh] flex flex-col gap-4 max-xsm:hidden p-1 border-2 border-black rounded-xl ">
        <Slider
          step={500}
          size="sm"
          minValue={0}
          maxValue={100000}
          color="foreground"
          label="Price Range"
          defaultValue={[
            URLQueryFilters.price ? (URLQueryFilters.price as number[])[0] : 0,
            URLQueryFilters.price
              ? (URLQueryFilters.price as number[])[1]
              : 10000,
          ]}
          className="w-full font-medium"
          formatOptions={{ style: "currency", currency: "NPR" }}
          onChangeEnd={(priceRangeValue) => {
            queryFilters.priceRange = priceRangeValue;
            updataURL();
          }}
        />
        <div className="flex gap-2">
          <Slider
            step={1}
            size="sm"
            minValue={0}
            maxValue={5}
            label="Rating"
            defaultValue={[
              URLQueryFilters.rating
                ? (URLQueryFilters.rating as number[])[0]
                : 0,
              URLQueryFilters.rating
                ? (URLQueryFilters.rating as number[])[1]
                : 5,
            ]}
            color="foreground"
            className="w-1/2 font-medium"
            onChangeEnd={(ratingValue) => {
              queryFilters.ratingRange = ratingValue;
              updataURL();
            }}
          />
          <Slider
            step={1}
            size="sm"
            minValue={2}
            maxValue={20}
            defaultValue={[
              URLQueryFilters.capacity
                ? (URLQueryFilters.capacity as number[])[0]
                : 2,
              URLQueryFilters.capacity
                ? (URLQueryFilters.capacity as number[])[1]
                : 3,
            ]}
            color="foreground"
            label="Person Capacity"
            className="w-1/2 font-medium"
            onChangeEnd={(capacityRangeValue) => {
              queryFilters.capacityValue = capacityRangeValue;
              updataURL();
            }}
          />
        </div>

        <CustomCheckboxGroup<Aminities>
          label="Amenities"
          options={["PARKING", "WIFI"]}
          defaultValue={URLQueryFilters.amenities}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(amenity) => {
            queryFilters.Amenities = amenity;
            updataURL();
          }}
        />
        <CustomCheckboxGroup<RoomType>
          label="Room Type"
          defaultValue={URLQueryFilters.roomtype}
          options={["ONE_BHK", "TWO_BHK", "FLAT"]}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(roomType) => {
            queryFilters.roomType = roomType;
            updataURL();
          }}
        />
        <CustomCheckboxGroup<PostedBy>
          label="Posted By"
          defaultValue={URLQueryFilters.postedby}
          options={["OWNER", "BROKER", "USER"]}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(postedBy) => {
            queryFilters.postedBy = postedBy;
            updataURL();
          }}
        />
        <CustomCheckboxGroup<FurnishingStatus>
          label="Furnishing Status"
          defaultValue={URLQueryFilters.furnishingstatus}
          options={["FURNISHED", "SEMIFURNISHED", "UNFURNISHED"]}
          className="grid grid-cols-3 lg:grid-cols-auto-fit] lg:min-[300px] max-sm:grid-cols-2"
          onChange={(furnishingStatus) => {
            queryFilters.furnishingStatus = furnishingStatus;
            updataURL();
          }}
        />
        {/* <CustomCheckbox
          label="Verified"
          onChange={(verify) => {
            queryFilters.Verified = verify;
            updataURL();
          }}
        /> */}
      </div>
      <div className="grid gap-2 ">
        {children}
        {locations}
        {offset !== null && <div ref={observerRef} style={{ height: "1px" }} />}
        {/* {loading && <p className="text-center">Loading...</p>} */}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadMoreCityLocations;
