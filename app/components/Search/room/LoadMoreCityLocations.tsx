'use client';

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { FurnishingStatusEnum, Role } from '@prisma/client';

import {
  useFilterUpdater,
  useInfiniteRoomQuery,
} from '@/app/search/CustomHooks';
import {
  postedBy,
  roomType,
  roomAmenities,
  furnishingStatus,
} from '@/app/lib/scalableComponents';
import {
  useThemeState,
  useGetRoomSearchData,
} from '@/app/providers/reactqueryProvider';
import {
  PriceSlider,
  RatingSlider,
  CustomCheckbox,
  CapacitySlider,
  CustomCheckboxGroup,
} from '../../ReUsable/FormReusableComponent';
import { RoomFilters } from '@/app/types/filters';
import { cn } from '@/app/lib/utils/tailwindMerge';
import CityLocationsData from './CityLocationsData';
import { RoomType, RoomAmenities } from '../../../types/types';

const LoadMoreCityLocations = () => {
  const cacheTheme = useThemeState();
  const searchData = useGetRoomSearchData();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteRoomQuery();
  const updateFilter = useFilterUpdater();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const memoizedPages = useMemo(() => data?.pages ?? [], [data?.pages]);

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
        'grid gap-2 grid-cols-[3fr_8fr] max-sm:grid-cols-[2fr_4fr] max-xsm:grid-cols-[1fr] m-1 mb-6'
      }
    >
      <div
        className={cn(
          cacheTheme?.bg,
          cacheTheme?.textColor,
          cacheTheme?.borderColor,
          'h-[90vh] overflow-y-scroll sticky top-[8.5vh] xl:overflow-y-hidden xl:h-fit max-sm:top-1 flex flex-col gap-4 max-xsm:hidden p-1 border-2 rounded-xl '
        )}
      >
        <FilterLayout updateFilter={updateFilter} filters={searchData} />
      </div>
      <div className="">
        {memoizedPages?.[0]?.length === 0 ? (
          <div className="flex justify-center items-center">No Rooms Found</div>
        ) : (
          memoizedPages.map((roomDetails, pageIndex) => (
            <CityLocationsData
              key={pageIndex}
              category="room"
              cityLocationsData={roomDetails}
            />
          ))
        )}

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
        <div
          className={cn(
            cacheTheme?.borderColor,
            'flex flex-col gap-1 w-full h-[50vh] col-span-9 border-2 rounded-t-2xl p-2 overflow-y-scroll'
          )}
        >
          <FilterLayout updateFilter={updateFilter} filters={searchData} />
        </div>
        <div
          className={cn(
            cacheTheme?.borderColor,
            'cursor-pointer rounded-full p-1 backdrop-blur-3xl border-2 absolute bottom-[0.8vh] right-1'
          )}
          onClick={togglePanel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={34}
            height={34}
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-x`}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      </div>

      {!isPanelOpen && (
        <div
          className={cn(
            cacheTheme?.bg,
            cacheTheme?.textColor,
            cacheTheme?.borderColor,
            'hidden max-xsm:block fixed bottom-[8.5vh] right-1 p-2 text-xl rounded-lg border'
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

const FilterLayout = ({
  filters,
  updateFilter,
}: {
  filters: RoomFilters | undefined;
  updateFilter: <K extends keyof RoomFilters>(
    key: K,
    value: RoomFilters[K]
  ) => void;
}) => {
  return (
    <React.Fragment>
      <PriceSlider
        defaultValue={filters?.price}
        onChangeEnd={(priceRange) => updateFilter('price', priceRange)}
      />

      <div
        className={cn(
          'grid gap-4 mx-1',
          'xl:grid-cols-2 ',
          'lg:grid-cols-1',
          'max-sm:grid-cols-2 max-sm:mx-0'
        )}
      >
        <RatingSlider
          defaultValue={filters?.rating}
          onChangeEnd={(ratingRange) => updateFilter('rating', ratingRange)}
        />

        <CapacitySlider
          defaultValue={filters?.capacity}
          onChangeEnd={(capacityValue) =>
            updateFilter('capacity', capacityValue)
          }
        />
      </div>

      <CustomCheckboxGroup<RoomAmenities>
        label="Amenities"
        options={roomAmenities}
        defaultValue={filters?.amenities as RoomAmenities[]}
        className="grid xl:grid-cols-3 grid-cols-2 "
        onChange={(amenity) => updateFilter('amenities', amenity)}
      />
      <CustomCheckboxGroup<RoomType>
        label="Room Type"
        defaultValue={filters?.roomtype as RoomType[]}
        options={roomType}
        className="grid grid-cols-3 max-sm:grid-cols-2"
        onChange={(roomType) => updateFilter('roomtype', roomType)}
      />
      <CustomCheckboxGroup<Role>
        label="Posted By"
        defaultValue={filters?.postedby as Role[]}
        options={postedBy}
        className="grid grid-cols-3 max-sm:grid-cols-2"
        onChange={(postedBy) => updateFilter('postedby', postedBy)}
      />
      <CustomCheckboxGroup<FurnishingStatusEnum>
        label="Furnishing Status"
        defaultValue={filters?.furnishingstatus as FurnishingStatusEnum[]}
        options={furnishingStatus}
        className="grid xl:grid-cols-3 grid-cols-2 "
        onChange={(furnishingStatus) =>
          updateFilter('furnishingstatus', furnishingStatus)
        }
      />

      <CustomCheckbox
        label="Verified"
        defaultValue={filters?.verified as boolean}
        onChange={(verify) => updateFilter('verified', verify)}
      />
    </React.Fragment>
  );
};
