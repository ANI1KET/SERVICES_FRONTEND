'use client';

import { useForm } from 'react-hook-form';
import Select from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import {
  useAppSelector,
  useLazyGetRoomCityLocationsQuery,
  useLazyGetRoomLocationsQuery,
} from '@/app/store/hooks/hooks';
import { SearchQuery } from '@/app/types/types';
import RoomApi from '@/app/store/slices/roomApiSlice';
import {
  CapacitySlider,
  CheckedBox,
  PriceSlider,
  RatingSlider,
  TickCheckboxGroup,
} from './FormReusableComponent';

const SearchForm: React.FC = () => {
  const router = useRouter();
  const activeTab = useAppSelector(
    (state) => state.tabs.activeTabs.CategoryTab
  );
  const cachedData = useAppSelector(
    (state) =>
      RoomApi.endpoints.getRoomLocations.select({ category: activeTab })(state)
        .data
  );

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

  useEffect(() => {
    if (cachedData?.city) {
      setValue('city', cachedData.city);
      setValue('location', '');
    }
  }, [cachedData, setValue]);

  const verified = watch('verified');
  const selectedCity = watch('city');
  const selectedCityLocation = watch('location');

  const [
    triggerGetRoomLocations,
    {
      // data: roomLocationsData,
      // error: roomLocationsError,
      // isLoading: roomLocationsLoading,
    },
  ] = useLazyGetRoomLocationsQuery();
  useEffect(() => {
    if (!cachedData) {
      triggerGetRoomLocations({ category: activeTab });
    }
  }, [activeTab]);

  const [
    triggerGetRoomCityLocations,
    {
      // data: roomCityLocationsData,
      // error: roomCityLocationsError,
      // isLoading: roomCityLocationsLoading,
    },
  ] = useLazyGetRoomCityLocationsQuery();

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

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
    const url = `/${activeTab}?place=${compressedURLQuery}&filters=${compressedURLQueryFilters}`;
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
      <div className="max-sm:hidden col-span-1 max-sm:col-span-3 grid grid-flow-col place-content-center place-items-center border-r-[1px] border-black h-full cursor-pointer group ">
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
      </div>

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
              const capitalizedCity = capitalize(value.target.value);
              if (
                cachedData &&
                cachedData[activeTab].hasOwnProperty(capitalizedCity)
                // capitalizedCity in cachedData[activeTab]
              ) {
                if (
                  (cachedData[activeTab] as { [key: string]: string[] | [] })[
                    capitalizedCity
                  ].length === 0
                ) {
                  triggerGetRoomCityLocations({
                    category: activeTab,
                    city: capitalizedCity,
                  });
                }
                setValue('city', capitalizedCity);
                setSelectedLocation([]);
              }
            }}
          >
            {cachedData &&
              cachedData[activeTab] &&
              Object.keys(cachedData[activeTab]).map((city) => {
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
              cachedData?.[activeTab] &&
              typeof cachedData[activeTab] === 'object' &&
              selectedCity &&
              cachedData[activeTab][selectedCity]?.includes(
                selectedCityLocation
              )
                ? selectedCityLocation
                : ''
            }
            disabled={
              !(
                cachedData?.[activeTab] &&
                typeof cachedData[activeTab] === 'object' &&
                selectedCity &&
                cachedData[activeTab][selectedCity]
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
            {cachedData &&
              (cachedData[activeTab] as { [key: string]: string[] | [] })[
                selectedCity
              ]?.map((city) => {
                return (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>

      {selectedLocation.length > 0 && (
        <div className="hidden max-sm:block col-span-7 place-content-center border-2 border-black rounded-xl overflow-x-auto whitespace-nowrap">
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

      {selectedLocation.length > 0 && (
        <div
          className={`max-sm:hidden absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%+0.7rem)] col-span-7 col-start-2 place-content-center p-1 bg-white border-b-2 border-r-2 border-l-2 border-black rounded-b-xl overflow-x-scroll`}
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

      <div className="hidden max-sm:flex flex-col gap-1 h-[52vh] col-span-9 border-2 border-black rounded-2xl p-1 overflow-y-scroll">
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
    </form>
  );
};

export default SearchForm;
