'use client';

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  PropertyArea,
  PropertyPlotWidth,
  PropertyAmenities,
  PropertyHouseArea,
  PropertyPlotLength,
} from '@/app/types/types';
import {
  useInfinitePropertyQuery,
  usePropertyFilterUpdater,
} from '@/app/search/CustomHooks';
import {
  propertyArea,
  propertyAmenities,
  propertyHouseArea,
  propertyPlotWidth,
  propertyPlotLength,
} from '@/app/lib/scalableComponents';
import {
  useThemeState,
  useGetPropertySearchData,
} from '@/app/providers/reactqueryProvider';
import {
  PriceSlider,
  DynamicSlider,
  CustomCheckbox,
  SliderSelectOutput,
  CustomCheckboxGroup,
} from '../../ReUsable/FormReusableComponent';
import { cn } from '@/app/lib/utils/tailwindMerge';
import CityLocationsData from './CityLocationsData';
import { PropertyFilters, PropertySearchQueries } from '@/app/types/filters';

const LoadMoreCityLocations = () => {
  const cacheTheme = useThemeState();
  const searchData = useGetPropertySearchData();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePropertyQuery();
  const updateFilter = usePropertyFilterUpdater();

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
        <PropertyFilterLayout
          updateFilter={updateFilter}
          filters={searchData}
        />
      </div>
      <div className="">
        {memoizedPages[0]?.length === 0 ? (
          <div className="flex justify-center items-center">
            No Properties Found
          </div>
        ) : (
          memoizedPages.map((roomDetails, pageIndex) => (
            <CityLocationsData
              key={pageIndex}
              category="property"
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
          <PropertyFilterLayout
            updateFilter={updateFilter}
            filters={searchData}
          />
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

const PropertyFilterLayout = ({
  filters,
  updateFilter,
}: {
  filters: PropertyFilters | undefined;
  updateFilter: <K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K]
  ) => void;
}) => {
  return (
    <>
      <PriceSlider
        min={100000}
        step={200000}
        max={100000000}
        defaultValue={filters?.price}
        onChangeEnd={(priceRange) => updateFilter('price', priceRange)}
      />

      <SliderSelectOutput<PropertySearchQueries, 'area', PropertyArea>
        label="area"
        sliderMin={1}
        sliderStep={1}
        sliderMax={1000}
        options={propertyArea}
        // defaultValue={filters?.area}
        onChange={(area) => {
          updateFilter('area', area);
        }}
      />

      {filters?.propertyType === 'House' && (
        <>
          <SliderSelectOutput<
            PropertySearchQueries,
            'builtUpArea',
            PropertyHouseArea
          >
            sliderMin={1}
            sliderStep={1}
            sliderMax={1000}
            label="builtUpArea"
            options={propertyHouseArea}
            // defaultValue={filters?.area}
            onChange={(area) => {
              updateFilter('area', area);
            }}
          />

          <DynamicSlider
            min={1}
            step={1}
            max={50}
            label="Floors"
            defaultValue={filters.floors}
            onChangeEnd={(value) => updateFilter('floors', value)}
          />
          <DynamicSlider
            min={1}
            step={1}
            max={100}
            label="Bedrooms"
            defaultValue={filters.bedrooms}
            onChangeEnd={(value) => updateFilter('bedrooms', value)}
          />
          <DynamicSlider
            min={1}
            step={1}
            max={20}
            label="Kitchens"
            defaultValue={filters.kitchens}
            onChangeEnd={(value) => updateFilter('kitchens', value)}
          />
          <DynamicSlider
            min={1}
            step={1}
            max={20}
            label="Bathrooms"
            defaultValue={filters.bathrooms}
            onChangeEnd={(value) => updateFilter('bathrooms', value)}
          />

          <CustomCheckboxGroup<PropertyAmenities>
            label="Amenities"
            options={propertyAmenities}
            defaultValue={filters?.amenities as PropertyAmenities[]}
            className="grid xl:grid-cols-3 grid-cols-2 "
            onChange={(amenity) => updateFilter('amenities', amenity)}
          />
        </>
      )}

      {filters?.propertyType === 'Land' && (
        <>
          <SliderSelectOutput<
            PropertySearchQueries,
            'plotWidth',
            PropertyPlotWidth
          >
            sliderMin={5}
            sliderStep={1}
            sliderMax={100}
            label="plotWidth"
            options={propertyPlotWidth}
            // defaultValue={filters?.area}
            onChange={(width) => {
              updateFilter('plotWidth', width);
            }}
          />

          <SliderSelectOutput<
            PropertySearchQueries,
            'plotLength',
            PropertyPlotLength
          >
            sliderMin={5}
            sliderStep={1}
            sliderMax={100}
            label="plotLength"
            options={propertyPlotLength}
            // defaultValue={filters?.area}
            onChange={(length) => {
              updateFilter('plotLength', length);
            }}
          />
        </>
      )}

      <CustomCheckbox
        label="Verified"
        defaultValue={filters?.verified as boolean}
        onChange={(verify) => updateFilter('verified', verify)}
      />
    </>
  );
};
