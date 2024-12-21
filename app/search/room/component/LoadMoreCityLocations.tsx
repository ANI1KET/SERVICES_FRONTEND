'use client';

import { throttle } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

import {
  PostedBy,
  RoomType,
  Aminities,
  QueryFilters,
  FurnishingStatus,
  DefaultQueryFilters,
} from '../../../types/types';
import {
  PriceSlider,
  RatingSlider,
  CustomCheckbox,
  CapacitySlider,
  CustomCheckboxGroup,
} from '../../../lib/ui/FormReusableComponent';

type LoadMoreCityLocationsProps = React.PropsWithChildren<{
  enncodedPlaceURL: string;
  initialOffset: number | null;
  URLQueryFilters: QueryFilters;
  loadMoreCityLocations: (params: {
    offset: number;
  }) => Promise<readonly [JSX.Element, number | null]>;
  children: React.ReactNode;
}>;

const LoadMoreCityLocations = ({
  children,
  initialOffset,
  URLQueryFilters,
  enncodedPlaceURL,
  loadMoreCityLocations,
}: LoadMoreCityLocationsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [locations, setLocations] = useState<JSX.Element[]>([]);
  const [offset, setOffset] = useState<number | null>(initialOffset);

  const defaultFilters: DefaultQueryFilters = useMemo(
    () => ({
      postedBy: [],
      roomType: [],
      Amenities: [],
      Verified: false,
      capacityValue: [2, 3],
      ratingRange: [0, 5],
      furnishingStatus: [],
      priceRange: [0, 10000],
    }),
    []
  );

  const [queryFilters, setQueryFilters] =
    useState<DefaultQueryFilters>(defaultFilters);

  const handleLoadMore = useCallback(async () => {
    if (offset === null || loading) return;

    setLoading(true);

    const [newLocations, nextOffset] = await loadMoreCityLocations({
      offset,
    });

    setLocations((prev) => [...prev, newLocations]);
    setOffset(nextOffset);
    setLoading(false);
  }, [offset, loading, loadMoreCityLocations]);

  const updateURL = useCallback(() => {
    const compressedURLQueryFilters = btoa(
      JSON.stringify({
        price: queryFilters.priceRange,
        rating: queryFilters.ratingRange,
        capacity: queryFilters.capacityValue,
        verified: queryFilters.Verified || undefined,
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
  }, [
    router,
    enncodedPlaceURL,
    queryFilters.Verified,
    queryFilters.postedBy,
    queryFilters.roomType,
    queryFilters.Amenities,
    queryFilters.priceRange,
    queryFilters.ratingRange,
    queryFilters.capacityValue,
    queryFilters.furnishingStatus,
  ]);

  const throttledUpdateURL = useMemo(
    () => throttle(updateURL, 1000),
    [updateURL]
  );

  useEffect(() => {
    return () => {
      throttledUpdateURL.cancel();
    };
  }, [throttledUpdateURL]);

  useEffect(() => {
    setOffset(initialOffset);
    setLocations([]);

    setQueryFilters((prev) => ({
      ...prev,
      priceRange: URLQueryFilters.price,
      ratingRange: URLQueryFilters.rating,
      capacityValue: URLQueryFilters.capacity,
      Verified: URLQueryFilters.verified,
      postedBy: URLQueryFilters.postedby,
      roomType: URLQueryFilters.roomtype,
      Amenities: URLQueryFilters.amenities,
      furnishingStatus: URLQueryFilters.furnishingstatus,
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
        rootMargin: '300px',
        threshold: 0,
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
      <div className="h-fit sticky top-[13vh] max-sm:top-[1vh] flex flex-col gap-4 max-xsm:hidden p-1 border-2 border-black rounded-xl ">
        <PriceSlider
          defaultValue={URLQueryFilters.price}
          onChangeEnd={(value) => {
            queryFilters.priceRange = value;
            throttledUpdateURL();
          }}
        />

        <div className="flex gap-4 max-sm:flex-col">
          <RatingSlider
            defaultValue={URLQueryFilters.rating}
            onChangeEnd={(value) => {
              queryFilters.ratingRange = value;
              throttledUpdateURL();
            }}
          />

          <CapacitySlider
            defaultValue={URLQueryFilters.capacity}
            onChangeEnd={(value) => {
              queryFilters.capacityValue = value;
              throttledUpdateURL();
            }}
          />
        </div>

        <CustomCheckboxGroup<Aminities>
          label="Amenities"
          options={['PARKING', 'WIFI']}
          defaultValue={URLQueryFilters.amenities}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(amenity) => {
            queryFilters.Amenities = amenity;
            throttledUpdateURL();
          }}
        />
        <CustomCheckboxGroup<RoomType>
          label="Room Type"
          defaultValue={URLQueryFilters.roomtype}
          options={['ONE_BHK', 'TWO_BHK', 'FLAT']}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(roomType) => {
            queryFilters.roomType = roomType;
            throttledUpdateURL();
          }}
        />
        <CustomCheckboxGroup<PostedBy>
          label="Posted By"
          defaultValue={URLQueryFilters.postedby}
          options={['OWNER', 'BROKER', 'USER']}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(postedBy) => {
            queryFilters.postedBy = postedBy;
            throttledUpdateURL();
          }}
        />
        <CustomCheckboxGroup<FurnishingStatus>
          label="Furnishing Status"
          defaultValue={URLQueryFilters.furnishingstatus}
          options={['FURNISHED', 'SEMIFURNISHED', 'UNFURNISHED']}
          className="grid grid-cols-3 lg:grid-cols-auto-fit] lg:min-[300px] max-sm:grid-cols-2"
          onChange={(furnishingStatus) => {
            queryFilters.furnishingStatus = furnishingStatus;
            throttledUpdateURL();
          }}
        />
        <CustomCheckbox
          label="Verified"
          defaultValue={URLQueryFilters.verified}
          onChange={(verify) => {
            queryFilters.Verified = verify;
            throttledUpdateURL();
          }}
        />
      </div>
      <div className="grid gap-2 ">
        {children}
        {locations}
        {offset !== null && <div ref={observerRef} style={{ height: '1px' }} />}
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
