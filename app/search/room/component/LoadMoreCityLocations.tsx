'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
import { cn } from '@/app/lib/utils/tailwindMerge';
import CityLocationsData from './CityLocationsData';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { useFilterUpdater, useInfiniteRoomQuery } from '../../CustomHooks';

const LoadMoreCityLocations = () => {
  const cacheTheme = useThemeState();
  const queryClient = useQueryClient();
  const { data: searchData } = useQuery<SearchQueries>({
    queryKey: ['searchData'],
    enabled: false,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteRoomQuery(queryClient);

  const updateFilter = useFilterUpdater(queryClient, refetch);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

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
    <div
      className={
        'grid gap-2 grid-cols-[3fr_6fr] max-sm:grid-cols-[2fr_4fr] max-xsm:grid-cols-[1fr] m-1 mb-6'
      }
    >
      <div
        className={cn(
          cacheTheme?.bg,
          cacheTheme?.textColor,
          cacheTheme?.borderColor,
          'h-fit max-sm:h-[90vh] max-sm:overflow-y-scroll sticky top-[8.5vh] max-sm:top-1 flex flex-col gap-4 max-xsm:hidden p-1 border-2 rounded-xl '
        )}
      >
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
          options={['PARKING', 'WIFI', 'WATER']}
          defaultValue={searchData?.filters.amenities as Aminities[]}
          className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
          onChange={(amenity) => updateFilter('amenities', amenity)}
        />
        <CustomCheckboxGroup<RoomType>
          label="Room Type"
          defaultValue={searchData?.filters.roomtype as RoomType[]}
          options={['1BHK', '2BHK', '3BHK', '4BHK', 'FLAT']}
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
            <div
              className={cn(
                cacheTheme?.borderColor,
                'w-8 h-8 border-4 border-t-transparent rounded-full animate-spin'
              )}
            ></div>
          </div>
        )}
      </div>

      <div
        className={cn(
          cacheTheme?.bg,
          cacheTheme?.textColor,
          `fixed bottom-[7.8vh] left-0 right-0 flex flex-col items-center rounded-t-2xl transition-transform duration-300 ${
            isPanelOpen ? '' : 'hidden'
          }`
        )}
      >
        <div className="flex flex-col gap-1 w-full h-[50vh] col-span-9 border-2 rounded-t-2xl p-2 overflow-y-scroll">
          <PriceSlider
            defaultValue={searchData?.filters.price}
            onChangeEnd={(priceRange) => updateFilter('price', priceRange)}
          />

          <div className="flex gap-4">
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
            options={['PARKING', 'WIFI', 'WATER']}
            defaultValue={searchData?.filters.amenities as Aminities[]}
            className="grid grid-cols-3 lg:grid-cols-3 max-sm:grid-cols-2"
            onChange={(amenity) => updateFilter('amenities', amenity)}
          />
          <CustomCheckboxGroup<RoomType>
            label="Room Type"
            defaultValue={searchData?.filters.roomtype as RoomType[]}
            options={['1BHK', '2BHK', '3BHK', '4BHK', 'FLAT']}
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
        <div
          className="cursor-pointer rounded-full p-1 backdrop-blur-3xl border-2 absolute bottom-[0.8vh] right-1"
          onClick={togglePanel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={34}
            height={34}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-x`}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>{' '}
        </div>
      </div>

      {!isPanelOpen && (
        <div
          className={cn(
            cacheTheme?.bg,
            cacheTheme?.textColor,
            cacheTheme?.borderColor,
            'hidden max-xsm:block fixed bottom-[8.5vh] right-1 z-10 p-2 text-xl rounded-lg border'
          )}
          onClick={togglePanel}
        >
          Filters
        </div>
      )}
    </div>
  );
};

export default LoadMoreCityLocations;
