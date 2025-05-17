'use client';

import {
  Control,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import {
  postedBy,
  roomType,
  roomAmenities,
  furnishingStatus,
} from '@/app/lib/scalableComponents';
import {
  useSetCity,
  ThemeState,
  useThemeState,
  useSetRoomSearchData,
} from '@/app/providers/reactqueryProvider';
import {
  FetchCategoryCityLocations,
  FetchCategoryCitiesLocations,
} from '@/app/lib/utils/FetchCategoryPlaces';
import {
  CheckedBox,
  PriceSlider,
  RatingSlider,
  CapacitySlider,
  TickCheckboxGroup,
  DefaultSelectField,
  MultipleSelectField,
} from '@/app/components/ReUsable/FormReusableComponent';
import { ArrowUpIcon } from '@/app/lib/icon/svg';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { RoomSearchQueries } from '@/app/types/filters';
import useBreakpoint from '@/app/lib/utils/useBreakpoint';

const RoomSearchForm: React.FC<{
  city: string;
  category: string;
}> = ({ category, city }) => {
  const router = useRouter();
  const cachedTheme = useThemeState();
  const { isMobile } = useBreakpoint();
  const roomSearchData = useSetRoomSearchData();
  const set_city = useSetCity();

  const { control, register, setValue, watch, handleSubmit } =
    useForm<RoomSearchQueries>({
      defaultValues: {
        city: city,
        postedby: [],
        roomtype: [],
        locations: [],
        amenities: [],
        furnishingstatus: [],
      },
    });
  const selectedCity = watch('city');

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

  const onSubmit = (data: RoomSearchQueries) => {
    const { city, locations } = data;

    if (!city) return;

    roomSearchData(city, locations, {
      price: data.price,
      rating: data.rating,
      capacity: data.capacity,
      postedby: data.postedby,
      roomtype: data.roomtype,
      verified: data.verified,
      amenities: data.amenities,
      furnishingstatus: data.furnishingstatus,
    });

    router.push(`/search/${category}`);
  };

  const memoizedValue = useMemo(() => {
    return CitiesLocations && CitiesLocations[selectedCity];
  }, [CitiesLocations, selectedCity]);

  const memoizedDisabled = useMemo(() => {
    return CitiesLocations && CitiesLocations[selectedCity]?.length;
  }, [CitiesLocations, selectedCity]);
  return (
    <form
      className="grid grid-cols-9 gap-1 w-full h-1/2 max-sm:h-full relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!isMobile && (
        <div
          className={cn(
            cachedTheme?.borderColor,
            'col-span-1 max-sm:col-span-3 grid grid-flow-col place-content-center place-items-center border-r-[1px] h-full cursor-pointer group'
          )}
        >
          <p>Filter</p>
          <ArrowUpIcon className="group-hover:scale-125 group-hover:rotate-180 transition-all duration-300" />
          <RoomFilterLayout
            control={control}
            isMobile={isMobile}
            setValue={setValue}
            register={register}
            cachedTheme={cachedTheme}
          />
        </div>
      )}

      <div
        className={cn(
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          'max-sm:h-[5vh] col-span-2 max-sm:col-span-3 place-content-center max-sm:border-2 max-sm:rounded-xl border-r-[1px]'
        )}
      >
        <DefaultSelectField<RoomSearchQueries, 'city'>
          id="city"
          control={control}
          options={
            CitiesLocations
              ? Object.keys(CitiesLocations).filter((key) => key !== 'city')
              : []
          }
          onChange={(City) => {
            const city = City as string;
            set_city(city);
            if (CitiesLocations?.[city].length === 0) {
              reFetchCityLocations({ city, category });
            }
          }}
        />
      </div>

      <div
        className={cn(
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          `max-sm:h-[5vh] col-span-5 max-sm:col-span-6 place-content-center max-sm:border-2 max-sm:rounded-xl `
        )}
      >
        <MultipleSelectField<RoomSearchQueries, 'locations'>
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
          'max-sm:h-[5vh] m-1 col-span-1 space-y-3 max-sm:col-span-2 max-sm:col-start-8 place-content-center text-center max-sm:rounded-lg rounded-br-lg '
        )}
      >
        <button type="submit" className={`searchSubmit text-xl w-full`}>
          Search
        </button>
      </div>

      {isMobile && (
        <RoomFilterLayout
          control={control}
          isMobile={isMobile}
          setValue={setValue}
          register={register}
          cachedTheme={cachedTheme}
        />
      )}
    </form>
  );
};

export default RoomSearchForm;

const RoomFilterLayout = ({
  control,
  isMobile,
  setValue,
  register,
  cachedTheme,
}: {
  isMobile: boolean;
  cachedTheme: ThemeState | undefined;
  setValue: UseFormSetValue<RoomSearchQueries>;
  register: UseFormRegister<RoomSearchQueries>;
  control: Control<RoomSearchQueries, undefined, RoomSearchQueries>;
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
      <PriceSlider onChangeEnd={(value) => setValue('price', value)} />

      <div className="flex gap-4">
        <RatingSlider onChangeEnd={(value) => setValue('rating', value)} />

        <CapacitySlider onChangeEnd={(value) => setValue('capacity', value)} />
      </div>

      <TickCheckboxGroup<RoomSearchQueries, 'amenities'>
        id="amenities"
        label="Amenities"
        register={register}
        options={roomAmenities}
      />
      <TickCheckboxGroup<RoomSearchQueries, 'roomtype'>
        id="roomtype"
        label="Room Type"
        options={roomType}
        register={register}
      />
      <TickCheckboxGroup<RoomSearchQueries, 'furnishingstatus'>
        register={register}
        id="furnishingstatus"
        label="Furnishing Status"
        options={furnishingStatus}
      />
      <TickCheckboxGroup<RoomSearchQueries, 'postedby'>
        id="postedby"
        label="Posted By"
        options={postedBy}
        register={register}
      />

      <CheckedBox<RoomSearchQueries>
        id="verified"
        label="Verified"
        control={control}
      />
    </div>
  );
};
