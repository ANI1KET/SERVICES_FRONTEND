'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  PostedBy,
  RoomType,
  Aminities,
  SearchQueries,
  FurnishingStatus,
} from '../../../types/types';
import {
  PriceSlider,
  RatingSlider,
  CustomCheckbox,
  CapacitySlider,
  CustomCheckboxGroup,
} from '../../../lib/ui/FormReusableComponent';
import CityLocationsData from './CityLocationsData';
import { useFilterUpdater, useInfiniteRoomQuery } from '../../CustomHooks';

const LoadMoreCityLocations = () => {
  const queryClient = useQueryClient();
  const { data: searchData } = useQuery<SearchQueries>({
    queryKey: ['searchData'],
    enabled: false,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteRoomQuery(queryClient);

  const updateFilter = useFilterUpdater(queryClient, refetch);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    <div className="grid gap-2 grid-cols-[3fr_6fr] max-sm:grid-cols-[2fr_4fr] max-xsm:grid-cols-[1fr] m-1 mb-6">
      <div className="h-fit max-sm:h-[90vh] max-sm:overflow-y-scroll sticky top-[8.5vh] max-sm:top-1 flex flex-col gap-4 max-xsm:hidden p-1 border-2 border-black rounded-xl ">
        <PriceSlider
          defaultValue={searchData?.filters.price}
          onChangeEnd={(priceRange) => updateFilter('price', priceRange)}
        />

        <div className="flex gap-4 mx-1 max-sm:flex-col">
          <RatingSlider
            defaultValue={searchData?.filters.rating}
            onChangeEnd={(ratingRange) => updateFilter('rating', ratingRange)}
          />

          <CapacitySlider
            defaultValue={searchData?.filters.capacity}
            onChangeEnd={(capacityValue) =>
              updateFilter('capacity', capacityValue)
            }
          />
        </div>

        <CustomCheckboxGroup<Aminities>
          label="Amenities"
          options={['PARKING', 'WIFI']}
          defaultValue={searchData?.filters.amenities as Aminities[]}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(amenity) => updateFilter('amenities', amenity)}
        />
        <CustomCheckboxGroup<RoomType>
          label="Room Type"
          defaultValue={searchData?.filters.roomtype as RoomType[]}
          options={['ONE_BHK', 'TWO_BHK', 'FLAT']}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(roomType) => updateFilter('roomtype', roomType)}
        />
        <CustomCheckboxGroup<PostedBy>
          label="Posted By"
          defaultValue={searchData?.filters.postedby as PostedBy[]}
          options={['OWNER', 'BROKER', 'USER']}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(postedBy) => updateFilter('postedby', postedBy)}
        />
        <CustomCheckboxGroup<FurnishingStatus>
          label="Furnishing Status"
          defaultValue={
            searchData?.filters.furnishingstatus as FurnishingStatus[]
          }
          options={['FURNISHED', 'SEMIFURNISHED', 'UNFURNISHED']}
          className="grid grid-cols-3 lg:grid-cols-auto-fit] lg:min-[300px] max-sm:grid-cols-2"
          onChange={(furnishingStatus) =>
            updateFilter('furnishingstatus', furnishingStatus)
          }
        />
        <CustomCheckbox
          label="Verified"
          defaultValue={searchData?.filters.verified as boolean}
          onChange={(verify) => updateFilter('verified', verify)}
        />
      </div>
      <div className="">
        {data?.pages.map((roomDetails, pageIndex) => (
          <CityLocationsData
            key={pageIndex}
            category="room"
            cityLocationsData={roomDetails}
          />
        ))}
        <div ref={observerRef} className="h-1"></div>
        {isFetchingNextPage && (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadMoreCityLocations;
