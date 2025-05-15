'use client';

import {
  Control,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PropertyType } from '@prisma/client';

import {
  PropertyArea,
  PropertyHouseArea,
  PropertyPlotWidth,
  PropertyPlotLength,
} from '@/app/types/types';
import {
  propertyArea,
  propertyType,
  propertyPlotWidth,
  propertyAmenities,
  propertyPlotLength,
  propertyHouseArea,
} from '@/app/lib/scalableComponents';
import {
  useSetCity,
  ThemeState,
  useThemeState,
  useSetPropertySearchData,
} from '@/app/providers/reactqueryProvider';
import {
  FetchCategoryCityLocations,
  FetchCategoryCitiesLocations,
} from '@/app/lib/utils/FetchCategoryPlaces';
import {
  CheckedBox,
  PriceSlider,
  SliderSelect,
  DynamicSlider,
  TickCheckboxGroup,
  DefaultSelectField,
  MultipleSelectField,
} from '@/app/components/ReUsable/FormReusableComponent';
import { ArrowUpIcon } from '@/app/lib/icon/svg';
import { cn } from '@/app/lib/utils/tailwindMerge';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';
import { PropertySearchQueries } from '@/app/types/filters';

const PropertySearchForm: React.FC<{
  city: string;
  category: string;
}> = ({ category, city }) => {
  const router = useRouter();
  const set_city = useSetCity();
  const cachedTheme = useThemeState();
  const { isMobile } = useBreakpoint();
  const setPropertySearchData = useSetPropertySearchData();

  const { control, register, unregister, setValue, watch, handleSubmit } =
    useForm<PropertySearchQueries>({
      // shouldUnregister: true,
      defaultValues: {
        city: city,
        locations: [],
        amenities: [],
        // nearbyAreas: [],
        propertyType: 'House',
      },
    });
  const selectedCity = watch('city');
  const selectedpropertyType = watch('propertyType');

  const {
    data: CitiesLocations,
    error: CitiesLocationsError,
    isError: isCitiesLocationsError,
  } = FetchCategoryCitiesLocations(category, city);
  if (isCitiesLocationsError) {
    console.log(CitiesLocationsError.message);
  }

  const {
    // error,
    // isError,
    // isPending,
    mutate: reFetchCityLocations,
  } = FetchCategoryCityLocations();

  const onSubmit = (data: PropertySearchQueries) => {
    const { city, locations } = data;

    if (!city) return;

    if (data.propertyType === 'House')
      setPropertySearchData(city, locations, {
        area: data.area,
        price: data.price,
        floors: data.floors,
        bedrooms: data.bedrooms,
        kitchens: data.kitchens,
        verified: data.verified,
        bathrooms: data.bathrooms,
        amenities: data.amenities,
        builtUpArea: data.builtUpArea,
        propertyType: data.propertyType,
        // nearbyAreas: data.nearbyAreas,
      });
    else
      setPropertySearchData(city, locations, {
        area: data.area,
        price: data.price,
        verified: data.verified,
        plotWidth: data.plotWidth,
        plotLength: data.plotLength,
        propertyType: data.propertyType,
        // nearbyAreas: data.nearbyAreas,
      });

    router.push(`/search/${category}`);
  };

  const memoizedValue = useMemo(() => {
    return CitiesLocations && CitiesLocations[selectedCity];
  }, [CitiesLocations, selectedCity]);

  const memoizedDisabled = useMemo(() => {
    return CitiesLocations && CitiesLocations[selectedCity]?.length;
  }, [CitiesLocations, selectedCity]);

  useEffect(() => {
    if (selectedpropertyType === PropertyType.Land) {
      unregister([
        'floors',
        'bedrooms',
        'kitchens',
        'bathrooms',
        'amenities',
        'builtUpArea',
      ]);
    } else if (selectedpropertyType === PropertyType.House) {
      unregister(['plotWidth', 'plotLength']);
      setValue('amenities', []);
    }
  }, [selectedpropertyType, unregister]);
  return (
    <form
      className="grid grid-cols-9 gap-1 w-full h-1/2 max-sm:h-full relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!isMobile && (
        <div
          className={cn(
            cachedTheme?.borderColor,
            'col-span-1 grid grid-flow-col place-content-center place-items-center border-r-[1px] h-full cursor-pointer group'
          )}
        >
          <p>Filter</p>
          <ArrowUpIcon className="group-hover:scale-125 group-hover:rotate-180 transition-all duration-300" />

          <PropertyFilterLayout
            control={control}
            isMobile={isMobile}
            setValue={setValue}
            register={register}
            cachedTheme={cachedTheme}
            selectedpropertyType={selectedpropertyType}
          />
        </div>
      )}

      <div
        className={cn(
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          `max-sm:h-[5vh] col-span-1 max-sm:col-span-3 place-content-center max-sm:border-2 max-sm:rounded-xl border-r-[1px]`
        )}
      >
        <DefaultSelectField<PropertySearchQueries, 'propertyType'>
          id="propertyType"
          control={control}
          options={propertyType}
        />
      </div>

      <div
        className={cn(
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          'max-sm:h-[5vh] col-span-2 max-sm:col-span-6 place-content-center max-sm:border-2 max-sm:rounded-xl border-r-[1px]'
        )}
      >
        <DefaultSelectField<PropertySearchQueries, 'city'>
          id="city"
          control={control}
          options={
            CitiesLocations
              ? Object.keys(CitiesLocations).filter((key) => key !== 'city')
              : []
          }
          onChange={(City) => {
            const city = City as string;
            if (CitiesLocations?.[city].length === 0) {
              set_city(city);
              reFetchCityLocations({ city, category });
            }
          }}
        />
      </div>

      <div
        className={cn(
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          `max-sm:h-[5vh] col-span-4 max-sm:col-span-7 place-content-center max-sm:border-2 max-sm:rounded-xl `
        )}
      >
        <MultipleSelectField<PropertySearchQueries, 'locations'>
          id="locations"
          control={control}
          disabled={!memoizedDisabled}
          options={memoizedValue || []}
        />
      </div>

      <div
        className={cn(
          cachedTheme?.activeBg,
          cachedTheme?.activeTextColor,
          'max-sm:h-[5vh] m-1 col-span-1 space-y-3 max-sm:col-span-2 place-content-center text-center max-sm:rounded-lg rounded-br-lg '
        )}
      >
        <button type="submit" className={`searchSubmit text-xl w-full`}>
          Search
        </button>
      </div>

      {isMobile && (
        <PropertyFilterLayout
          control={control}
          isMobile={isMobile}
          setValue={setValue}
          register={register}
          cachedTheme={cachedTheme}
          selectedpropertyType={selectedpropertyType}
        />
      )}
    </form>
  );
};

export default PropertySearchForm;

const PropertyFilterLayout = ({
  control,
  isMobile,
  setValue,
  register,
  cachedTheme,
  selectedpropertyType,
}: {
  isMobile: boolean;
  selectedpropertyType: PropertyType;
  cachedTheme: ThemeState | undefined;
  setValue: UseFormSetValue<PropertySearchQueries>;
  register: UseFormRegister<PropertySearchQueries>;
  control: Control<PropertySearchQueries, undefined, PropertySearchQueries>;
}) => {
  return (
    <div
      className={cn(
        cachedTheme?.bg,
        cachedTheme?.borderColor,
        'flex flex-col border-2 rounded-2xl ',
        isMobile
          ? 'gap-1 h-[49vh] col-span-9 p-1 overflow-y-scroll'
          : 'w-full h-[40vh] overflow-x-scroll gap-2 p-2 absolute top-full left-0 right-0 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300'
      )}
    >
      <PriceSlider
        min={100000}
        step={200000}
        max={100000000}
        defaultValue={[100000, 10000000]}
        onChangeEnd={(value) => setValue('price', value)}
      />

      <SliderSelect<PropertySearchQueries, 'area', PropertyArea>
        id="area"
        label="Area"
        sliderMin={1}
        sliderStep={1}
        sliderMax={1000}
        register={register}
        options={propertyArea}
      />

      {selectedpropertyType === PropertyType.Land && (
        <>
          <SliderSelect<PropertySearchQueries, 'plotWidth', PropertyPlotWidth>
            id="plotWidth"
            sliderMin={5}
            sliderStep={1}
            sliderMax={100}
            label="PlotWidth"
            register={register}
            options={propertyPlotWidth}
          />

          <SliderSelect<PropertySearchQueries, 'plotLength', PropertyPlotLength>
            id="plotLength"
            sliderMin={5}
            sliderStep={1}
            sliderMax={100}
            label="PlotLength"
            register={register}
            options={propertyPlotLength}
          />
        </>
      )}

      {selectedpropertyType === PropertyType.House && (
        <>
          <SliderSelect<PropertySearchQueries, 'builtUpArea', PropertyHouseArea>
            id="builtUpArea"
            sliderMin={1}
            sliderStep={1}
            sliderMax={1000}
            register={register}
            label="BuiltUpArea"
            options={propertyHouseArea}
          />

          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <DynamicSlider
                min={1}
                step={1}
                max={50}
                label="Floors"
                defaultValue={10}
                onChangeEnd={(value) => setValue('floors', value)}
              />
            </div>

            <div className="col-span-1">
              <DynamicSlider
                min={1}
                step={1}
                max={100}
                label="Bedrooms"
                defaultValue={10}
                onChangeEnd={(value) => setValue('bedrooms', value)}
              />
            </div>

            <div className="col-span-1">
              <DynamicSlider
                min={1}
                step={1}
                max={20}
                defaultValue={5}
                label="Kitchens"
                onChangeEnd={(value) => setValue('kitchens', value)}
              />
            </div>

            <div className="col-span-1">
              <DynamicSlider
                min={1}
                step={1}
                max={20}
                defaultValue={5}
                label="Bathrooms"
                onChangeEnd={(value) => setValue('bathrooms', value)}
              />
            </div>

            <div className="col-span-2">
              <TickCheckboxGroup<PropertySearchQueries, 'amenities'>
                id="amenities"
                label="Amenities"
                register={register}
                options={propertyAmenities}
              />
            </div>
          </div>
        </>
      )}

      <CheckedBox<PropertySearchQueries>
        id="verified"
        label="Verified"
        control={control}
      />
    </div>
  );
};
