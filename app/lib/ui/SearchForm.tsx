'use client';

import Select from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import MenuItem from '@mui/material/MenuItem';
import { RoomSearchQuery } from '@/app/types/types';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import {
  postedBy,
  roomType,
  roomAmenities,
  furnishingStatus,
} from '../scalableComponents';
import {
  FetchCategoryCityLocations,
  FetchCategoryCitiesLocations,
} from '../utils/FetchCategoryPlaces';
import { ArrowUpIcon } from '../icon/svg';
import {
  CheckedBox,
  PriceSlider,
  RatingSlider,
  CapacitySlider,
  TickCheckboxGroup,
} from '@/app/lib/ui/FormReusableComponent';
import {
  CityData,
  ThemeState,
  useTabState,
  useThemeState,
  useSetSearchData,
} from '@/app/providers/reactqueryProvider';
import { cn } from '../utils/tailwindMerge';
import useBreakpoint from '../utils/useBreakpoint';

const SearchForm: React.FC = () => {
  const router = useRouter();
  const tabState = useTabState();
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();
  const { isMobile } = useBreakpoint();
  const setSearchData = useSetSearchData();
  const category = tabState?.['CategoryTab'] as string;
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const {
    // formState: { isSubmitting, errors },
    watch,
    register,
    setValue,
    // setError,
    // clearErrors,
    handleSubmit,
  } = useForm<RoomSearchQuery>({
    defaultValues: {
      city: '',
      location: '',
      postedby: [],
      roomtype: [],
      amenities: [],
      furnishingstatus: [],
    },
  });

  const verified = watch('verified');
  const selectedCity = watch('city');
  const selectedCityLocation = watch('location');

  const cachedData = queryClient.getQueryData<CityData>([
    'getCategoryCitiesLocations',
  ]);
  const {
    data: CitiesLocations,
    isError: isCitiesLocationsError,
    error: CitiesLocationsError,
    refetch: reFetchCitiesLocations,
  } = FetchCategoryCitiesLocations(category, cachedData?.city as string);
  useEffect(() => {
    if (category) {
      if (!cachedData?.[category]) {
        reFetchCitiesLocations();
      }
    }
  }, [cachedData, category, queryClient, reFetchCitiesLocations]);
  if (isCitiesLocationsError) {
    console.log(CitiesLocationsError.message);
  }

  const {
    // data: CityLocations,
    // error: CityLocationsError,
    // isError: isCityLocationsError,
    reFetchCityLocations,
  } = FetchCategoryCityLocations();

  useEffect(() => {
    if (CitiesLocations?.city) {
      setValue('city', CitiesLocations.city);
      setValue('location', '');
    }
  }, [CitiesLocations, setValue]);

  const removeLocation = (indexToRemove: number) => {
    setSelectedLocation((prevLocations) =>
      prevLocations.filter((_, index) => index !== indexToRemove)
    );
  };

  const onSubmit = (data: RoomSearchQuery) => {
    const { city, location } = data;

    if (!city) return;

    const locations = selectedLocation.includes(location)
      ? selectedLocation
      : [...selectedLocation, location].filter(Boolean);

    setSearchData(city, locations, {
      price: data.price,
      rating: data.rating,
      capacity: data.capacity,
      verified: data.verified || undefined,
      postedby: data.postedby,
      roomtype: data.roomtype,
      amenities: data.amenities,
      furnishingstatus: data.furnishingstatus,
    });

    router.push(`/search/${tabState?.['CategoryTab']}`);
  };

  const memoizedValue = useMemo(() => {
    if (
      CitiesLocations?.[category] &&
      typeof CitiesLocations[category] === 'object' &&
      selectedCity &&
      CitiesLocations[category][selectedCity]?.includes(selectedCityLocation)
    ) {
      return selectedCityLocation;
    }
    return '';
  }, [CitiesLocations, category, selectedCity, selectedCityLocation]);

  const memoizedDisabled = useMemo(() => {
    return !(
      CitiesLocations?.[category] &&
      typeof CitiesLocations[category] === 'object' &&
      selectedCity &&
      CitiesLocations[category][selectedCity] &&
      CitiesLocations[category][selectedCity].length
    );
  }, [CitiesLocations, category, selectedCity]);
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
          <FilterLayout
            isMobile={isMobile}
            verified={verified}
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
        <FormControl
          fullWidth
          size="small"
          sx={{
            height: '5vh',
            '& .MuiOutlinedInput-root': {
              height: '100%',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
            '& .MuiSelect-select': {
              color: cachedTheme?.selectIcon,
            },
            '& .MuiInputBase-input': {
              color: cachedTheme?.selectIcon,
            },
            '& .MuiSelect-icon': {
              color: cachedTheme?.selectIcon,
            },
          }}
        >
          <Select
            value={selectedCity ?? ''}
            disabled={!(CitiesLocations && CitiesLocations[category])}
            onChange={(value) => {
              const city = value.target.value;
              if (
                CitiesLocations &&
                CitiesLocations[category].hasOwnProperty(city)
                // city in cachedData[activeTab]
              ) {
                if (
                  (
                    CitiesLocations[category] as {
                      [key: string]: string[] | [];
                    }
                  )[city].length === 0
                ) {
                  reFetchCityLocations(city, category);
                }
                setValue('city', city);
                setValue('location', '');
                setSelectedLocation([]);
              }
            }}
            className={cn(cachedTheme?.textColor)}
            MenuProps={{
              PaperProps: {
                sx: {
                  color: cachedTheme?.selectMenuTextColor,
                  backgroundColor: cachedTheme?.selectMenuBg,
                },
              },
            }}
          >
            {CitiesLocations &&
              CitiesLocations[category] &&
              Object.keys(CitiesLocations[category]).map((city) => {
                return (
                  <MenuItem
                    key={city}
                    value={city}
                    sx={{
                      '&.MuiMenuItem-root:hover': {
                        backgroundColor: cachedTheme?.selectMenuHoverFocused,
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: cachedTheme?.selectMenuHoverFocused,
                      },
                    }}
                  >
                    {city}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>

      <div
        className={cn(
          cachedTheme?.textColor,
          cachedTheme?.borderColor,
          `max-sm:h-[5vh] col-span-5 max-sm:col-span-6 place-content-center max-sm:border-2 max-sm:rounded-xl `
        )}
      >
        <FormControl
          fullWidth
          size="small"
          sx={{
            height: '5vh',
            '& .MuiOutlinedInput-root': {
              height: '100%',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
            '& .MuiSelect-select': {
              color: cachedTheme?.selectIcon,
            },
            '& .MuiInputBase-input': {
              color: cachedTheme?.selectIcon,
            },
            '& .MuiSelect-icon': {
              color: cachedTheme?.selectIcon,
            },
          }}
        >
          <Select
            value={memoizedValue}
            disabled={memoizedDisabled}
            onChange={(value) => {
              const location = value.target.value;

              setValue('location', location);
              setSelectedLocation((prevSelectedLocations: string[]) =>
                prevSelectedLocations.includes(location)
                  ? prevSelectedLocations
                  : [...prevSelectedLocations, location]
              );
            }}
            className={cn(cachedTheme?.textColor)}
            MenuProps={{
              PaperProps: {
                sx: {
                  color: cachedTheme?.selectMenuTextColor,
                  backgroundColor: cachedTheme?.selectMenuBg,
                },
              },
            }}
          >
            {CitiesLocations &&
              ((CitiesLocations[category] as {
                [key: string]: string[] | [];
              }) || {})[selectedCity]?.map((city) => {
                return (
                  <MenuItem
                    key={city}
                    value={city}
                    sx={{
                      '&.MuiMenuItem-root:hover': {
                        backgroundColor: cachedTheme?.selectMenuHoverFocused,
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: cachedTheme?.selectMenuHoverFocused,
                      },
                    }}
                  >
                    {city}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>

      {isMobile && selectedLocation.length > 0 && (
        <div
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.borderColor,
            'col-span-7 place-content-center border-2 rounded-xl overflow-x-auto whitespace-nowrap'
          )}
        >
          <div className="inline-flex gap-1">
            {selectedLocation.map((location, index) => (
              <span
                key={index}
                className={cn(
                  cachedTheme?.activeBg,
                  cachedTheme?.activeTextColor,
                  'inline-flex items-center gap-1 border px-2 rounded max-w-[120px] truncate my-1'
                )}
                title={location}
              >
                {location.length > 10
                  ? `${location.slice(0, 10)}...`
                  : location}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x cursor-pointer"
                  onClick={() => removeLocation(index)}
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      )}

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

      {!isMobile && selectedLocation.length > 0 && (
        <div
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.borderColor,
            'absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%+0.7rem)] col-span-7 col-start-2 place-content-center p-1 border-b-2 border-r-2 border-l-2 rounded-b-xl overflow-x-scroll'
          )}
        >
          <div className="flex gap-1">
            {selectedLocation.map((location, index) => {
              return (
                <p
                  key={index}
                  className={cn(
                    cachedTheme?.activeBg,
                    cachedTheme?.activeTextColor,
                    'inline-flex items-center gap-1 border px-2 rounded max-w-[140px]'
                  )}
                  title={location}
                >
                  <span className="truncate">
                    {location.length > 15
                      ? `${location.slice(0, 15)}...`
                      : location}
                  </span>
                  <svg
                    width="15"
                    height="15"
                    fill="none"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => removeLocation(index)}
                    className="lucide lucide-x cursor-pointer flex-shrink-0"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </p>
              );
            })}
          </div>
        </div>
      )}

      {isMobile && (
        <FilterLayout
          isMobile={isMobile}
          verified={verified}
          setValue={setValue}
          register={register}
          cachedTheme={cachedTheme}
        />
      )}
    </form>
  );
};

export default SearchForm;

const FilterLayout = ({
  isMobile,
  verified,
  setValue,
  register,
  cachedTheme,
}: {
  isMobile: boolean;
  verified: boolean | undefined;
  cachedTheme: ThemeState | undefined;
  setValue: UseFormSetValue<RoomSearchQuery>;
  register: UseFormRegister<RoomSearchQuery>;
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
      <TickCheckboxGroup<RoomSearchQuery, 'amenities'>
        id="amenities"
        label="Amenities"
        register={register}
        options={roomAmenities}
      />
      <TickCheckboxGroup<RoomSearchQuery, 'roomtype'>
        id="roomtype"
        label="Room Type"
        options={roomType}
        register={register}
      />
      <TickCheckboxGroup<RoomSearchQuery, 'furnishingstatus'>
        register={register}
        id="furnishingstatus"
        label="Furnishing Status"
        options={furnishingStatus}
      />
      <TickCheckboxGroup<RoomSearchQuery, 'postedby'>
        id="postedby"
        label="Posted By"
        options={postedBy}
        register={register}
      />
      <CheckedBox<RoomSearchQuery, 'verified'>
        id="verified"
        label="Verified"
        register={register}
        value={verified ?? false}
        onChange={(e) => setValue('verified', e.target.checked)}
      />
    </div>
  );
};
