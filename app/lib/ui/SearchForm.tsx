'use client';

import { useForm } from 'react-hook-form';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useQueryClient } from '@tanstack/react-query';

import {
  CapacitySlider,
  CheckedBox,
  PriceSlider,
  RatingSlider,
  TickCheckboxGroup,
} from '@/app/lib/ui/FormReusableComponent';
import {
  FetchCategoryCityLocations,
  FetchCategoryCitiesLocations,
} from '../utils/FetchCategoryPlaces';
import { SearchQuery } from '@/app/types/types';
import useBreakpoint from '../utils/useBreakpoint';
import { CityData, useTabState } from '@/app/providers/reactqueryProvider';

const SearchForm: React.FC = () => {
  const router = useRouter();
  const tabState = useTabState();
  const queryClient = useQueryClient();
  const { isMobile } = useBreakpoint();
  const category = tabState?.['CategoryTab'] as string;
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const {
    // formState: { errors },
    watch,
    register,
    setValue,
    // setError,
    // clearErrors,
    handleSubmit,
  } = useForm<SearchQuery>({
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

  const {
    data: CitiesLocations,
    isError: isCitiesLocationsError,
    error: CitiesLocationsError,
    refetch: reFetchCitiesLocations,
  } = FetchCategoryCitiesLocations(category);
  useEffect(() => {
    if (category) {
      const cachedData = queryClient.getQueryData<CityData>([
        'getRoomCitiesLocations',
      ]);
      if (!cachedData?.[category]) {
        reFetchCitiesLocations();
      }
    }
  }, [category, reFetchCitiesLocations]);
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

  const onSubmit = (data: SearchQuery) => {
    const { city, location } = data;

    if (!city) {
      return;
    }

    const locations = (() => {
      if (!selectedLocation.length && location) {
        return [location];
      }

      if (location && !selectedLocation.includes(location)) {
        return [...selectedLocation, location];
      }

      return selectedLocation;
    })();

    const compressedURLQuery = btoa(
      JSON.stringify({
        city: city,
        locations: locations,
      })
    );
    const compressedURLQueryFilters = btoa(
      JSON.stringify({
        price: data.price,
        rating: data.rating,
        capacity: data.capacity,
        verified: data.verified ? data.verified : undefined,
        postedby: data.postedby.length ? data.postedby : undefined,
        roomtype: data.roomtype.length ? data.roomtype : undefined,
        amenities: data.amenities.length ? data.amenities : undefined,
        furnishingstatus: data.furnishingstatus.length
          ? data.furnishingstatus
          : undefined,
      })
    );
    const url = `/${tabState?.['CategoryTab']}?place=${compressedURLQuery}&filters=${compressedURLQueryFilters}`;
    router.push(url);

    // const encodedCityURLQuery = btoa(JSON.stringify({ city: city }));
    // const encodedPriceURLQuery = btoa(JSON.stringify({ price: data.price }));
    // const encodedRatingURLQuery = btoa(JSON.stringify({ rating: data.rating }));
    // const encodedLocationsURLQuery = btoa(
    //   JSON.stringify({ locations: locations })
    // );
    // const encodedCapacityURLQuery = btoa(
    //   JSON.stringify({ capacity: data.capacity })
    // );
    // const encodedVerifiedURLQuery = btoa(
    //   JSON.stringify({ verified: data.verified })
    // );
    // const encodedPostedByURLQuery = btoa(
    //   JSON.stringify({ postedby: data.postedby })
    // );
    // const encodedRoomTypeURLQuery = btoa(
    //   JSON.stringify({ roomtype: data.roomtype })
    // );
    // const encodedAmienitiesURLQuery = btoa(
    //   JSON.stringify({ amenities: data.amenities })
    // );
    // const encodedFurnishingStatusURLQuery = btoa(
    //   JSON.stringify({ furnishingstatus: data.furnishingstatus })
    // );

    // const url = `/${activeTab}?city=${encodedCityURLQuery}&locations=${encodedLocationsURLQuery}
    // &price=${encodedPriceURLQuery}&rating=${encodedRatingURLQuery}&capacity=${encodedCapacityURLQuery}
    // &verified=${encodedVerifiedURLQuery}&postedby=${encodedPostedByURLQuery}&roomtype=${encodedRoomTypeURLQuery}
    // &amenities=${encodedAmienitiesURLQuery}&furnishingstatus=${encodedFurnishingStatusURLQuery}`;
  };
  return (
    <form
      className="grid grid-cols-9 gap-1 w-full h-1/2 max-sm:h-full relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!isMobile && (
        <div className="col-span-1 max-sm:col-span-3 grid grid-flow-col place-content-center place-items-center border-r-[1px] border-black h-full cursor-pointer group ">
          <p>Filter</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-up group-hover:scale-125 group-hover:rotate-180 transition-all duration-300"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          <div className="w-full h-[40vh] overflow-x-scroll flex flex-col gap-2 p-2 absolute top-full left-0 right-0 rounded-2xl border-2 border-black bg-white opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300">
            <PriceSlider onChangeEnd={(value) => setValue('price', value)} />
            <div className="flex gap-4">
              <RatingSlider
                onChangeEnd={(value) => setValue('rating', value)}
              />
              <CapacitySlider
                onChangeEnd={(value) => setValue('capacity', value)}
              />
            </div>
            <TickCheckboxGroup
              label="Amenities"
              options={['PARKING', 'WIFI']}
              register={register('amenities')}
            />
            <TickCheckboxGroup
              label="Room Type"
              options={['ONE_BHK', 'TWO_BHK', 'FLAT']}
              register={register('roomtype')}
            />
            <TickCheckboxGroup
              label="Furnishing Status"
              options={['FURNISHED', 'SEMIFURNISHED', 'UNFURNISHED']}
              register={register('furnishingstatus')}
            />
            <TickCheckboxGroup
              label="Posted By"
              options={['OWNER', 'BROKER', 'USER']}
              register={register('postedby')}
            />
            <CheckedBox
              label="Verified"
              value={verified ?? false}
              register={register('verified')}
              onChange={(e) => setValue('verified', e.target.checked)}
            />
          </div>
        </div>
      )}

      <div className="max-sm:h-[5vh] col-span-2 max-sm:col-span-3 place-content-center max-sm:border-2 max-sm:rounded-xl border-r-[1px] border-black">
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
            '& .MuiInputLabel-root': {
              color: 'gray',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'gray',
            },
          }}
        >
          <Select
            value={selectedCity ?? ''}
            disabled={!selectedCity}
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
          >
            {CitiesLocations &&
              CitiesLocations[category] &&
              Object.keys(CitiesLocations[category]).map((city) => {
                return (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>

      <div className="max-sm:h-[5vh] col-span-5 max-sm:col-span-6 place-content-center max-sm:border-2 max-sm:border-black max-sm:rounded-xl ">
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
            '& .MuiInputLabel-root': {
              color: 'gray',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'gray',
            },
          }}
        >
          <Select
            value={
              CitiesLocations?.[category] &&
              typeof CitiesLocations[category] === 'object' &&
              selectedCity &&
              CitiesLocations[category][selectedCity]?.includes(
                selectedCityLocation
              )
                ? selectedCityLocation
                : ''
            }
            disabled={
              !(
                CitiesLocations?.[category] &&
                typeof CitiesLocations[category] === 'object' &&
                selectedCity &&
                CitiesLocations[category][selectedCity] &&
                CitiesLocations[category][selectedCity].length
              )
            }
            onChange={(value) => {
              const location = value.target.value;

              setValue('location', location);
              setSelectedLocation((prevSelectedLocations: string[]) =>
                prevSelectedLocations.includes(location)
                  ? prevSelectedLocations
                  : [...prevSelectedLocations, location]
              );
            }}
          >
            {CitiesLocations &&
              ((CitiesLocations[category] as {
                [key: string]: string[] | [];
              }) || {})[selectedCity]?.map((city) => {
                return (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>

      {isMobile && selectedLocation.length > 0 && (
        <div className="col-span-7 place-content-center border-2 border-black rounded-xl overflow-x-auto whitespace-nowrap">
          <div className="inline-flex gap-1">
            {selectedLocation.map((location, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 border px-2 rounded bg-gray-100 max-w-[120px] truncate"
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

      <div className="max-sm:h-[4vh] col-span-1 space-y-3 max-sm:col-span-2 max-sm:col-start-8 place-content-center text-center bg-black max-sm:rounded-lg rounded-br-lg ">
        <button type="submit" className={`text-white text-xl w-full`}>
          Search
        </button>
      </div>

      {!isMobile && selectedLocation.length > 0 && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%+0.7rem)] col-span-7 col-start-2 place-content-center p-1 bg-white border-b-2 border-r-2 border-l-2 border-black rounded-b-xl overflow-x-scroll`}
        >
          <div className="inline-flex gap-1">
            {selectedLocation.map((location, index) => {
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 border px-2 rounded bg-gray-100 max-w-[120px] truncate"
                  title={location}
                >
                  {location.length > 15
                    ? `${location.slice(0, 15)}...`
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
              );
            })}
          </div>
        </div>
      )}

      {isMobile && (
        <div className="flex flex-col gap-1 h-[52vh] col-span-9 border-2 border-black rounded-2xl p-1 overflow-y-scroll">
          <PriceSlider onChangeEnd={(value) => setValue('price', value)} />

          <div className="flex gap-4">
            <RatingSlider onChangeEnd={(value) => setValue('rating', value)} />

            <CapacitySlider
              onChangeEnd={(value) => setValue('capacity', value)}
            />
          </div>

          <TickCheckboxGroup
            label="Amenities"
            options={['PARKING', 'WIFI']}
            register={register('amenities')}
          />

          <TickCheckboxGroup
            label="Room Type"
            options={['ONE_BHK', 'TWO_BHK', 'FLAT']}
            register={register('roomtype')}
          />

          <TickCheckboxGroup
            label="Furnishing Status"
            options={['FURNISHED', 'SEMIFURNISHED', 'UNFURNISHED']}
            register={register('furnishingstatus')}
          />

          <TickCheckboxGroup
            label="Posted By"
            options={['OWNER', 'BROKER', 'USER']}
            register={register('postedby')}
          />

          <CheckedBox
            label="Verified"
            value={verified ?? false}
            register={register('verified')}
            onChange={(e) => setValue('verified', e.target.checked)}
          />
        </div>
      )}
    </form>
  );
};

export default SearchForm;
