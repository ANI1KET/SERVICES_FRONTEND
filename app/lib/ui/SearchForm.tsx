"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Slider } from "@nextui-org/slider";
import { useCallback, useEffect, useState } from "react";

import {
  useAppSelector,
  useLazyGetRoomCityLocationsQuery,
  useLazyGetRoomLocationsQuery,
} from "@/app/store/hooks/hooks";
import { SearchQuery } from "@/app/types/types";
import RoomApi from "@/app/store/slices/roomApiSlice";
import { CheckedBox, PlusCheckboxGroup } from "./FormReusableComponent";

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
    setFocus,
    // setError,
    // clearErrors,
    handleSubmit,
  } = useForm<SearchQuery>({
    defaultValues: {
      city: "",
      location: "",
      postedby: [],
      roomtype: [],
      amenities: [],
      furnishingstatus: [],
    },
  });

  useEffect(() => {
    if (cachedData?.city) {
      setValue("city", cachedData.city);
      setValue("location", "");
    }
  }, [cachedData, setValue]);

  const selectedCity = watch("city");
  const verified = watch("verified");

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
      data: roomCityLocationsData,
      // error: roomCityLocationsError,
      // isLoading: roomCityLocationsLoading,
    },
  ] = useLazyGetRoomCityLocationsQuery();
  useEffect(() => {
    setFocus("location");
  }, [roomCityLocationsData, setFocus]);

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  // const clearInputErrors = (field: "city" | "location") => clearErrors(field);
  // const handleError = useCallback(
  //   (field: "city" | "location", message: string) => {
  //     setError(field, { type: "manual", message });
  //   },
  //   [setError]
  // );

  const removeLocation = useCallback(
    (indexToRemove: number) => {
      setSelectedLocation((prevLocations) =>
        prevLocations.filter((_, index) => index !== indexToRemove)
      );
      setFocus("location");
    },
    [setFocus]
  );

  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const capitalizedCity = capitalize(selectedCity);

    if (!selectedCity) {
      // clearInputErrors("city");
    } else if (
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
      setValue("city", capitalizedCity);
      setFocus("location");
      // clearErrors("city");
    }
    // else {
    //   handleError("city", "Currently, service is not available in the city.");
    // }

    setSelectedLocation([]);
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const location = e.currentTarget.value;

    const locations = (
      cachedData?.[activeTab] as { [key: string]: string[] | [] }
    )[selectedCity];
    if ((locations as string[]).includes(location)) {
      e.currentTarget.value = "";
      setSelectedLocation((prevSelectedLocations) =>
        prevSelectedLocations.includes(location)
          ? prevSelectedLocations
          : [...prevSelectedLocations, location]
      );
      // clearInputErrors("location");
    }
    // else if (location) {
    //   handleError(
    //     "location",
    //     "Service not available in this location right now."
    //   );
    // } else {
    //   clearErrors("location");
    // }
  };

  const onSubmit = (data: SearchQuery) => {
    const { city, location } = data;

    if (!city) {
      return;
      // handleError("city", "Please select the city.");
    }

    if (cachedData && !cachedData[activeTab]?.hasOwnProperty(city)) {
      return;
      // handleError(
      //   "city",
      //   "Currently, service is not available in the city."
      // );
    }

    const availableLocations = (
      cachedData?.[activeTab] as { [key: string]: string[] | [] }
    )[city] as string[];
    if (
      location &&
      (!availableLocations || !availableLocations.includes(location))
    ) {
      return;
      // handleError(
      //   "location",
      //   "Service not available in this location right now."
      // );
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
          <Slider
            step={500}
            size="sm"
            minValue={0}
            maxValue={100000}
            color="foreground"
            label="Price Range"
            defaultValue={[0, 10000]}
            className="w-full font-medium"
            formatOptions={{ style: "currency", currency: "NPR" }}
            onChangeEnd={(priceRangeValue) => {
              setValue("price", priceRangeValue);
            }}
          />
          <div className="flex gap-4">
            <Slider
              step={1}
              size="sm"
              minValue={0}
              maxValue={5}
              label="Rating"
              defaultValue={[0, 5]}
              color="foreground"
              className="w-1/2 font-medium"
              onChangeEnd={(ratingValue) => {
                setValue("rating", ratingValue);
              }}
            />
            <Slider
              step={1}
              size="sm"
              minValue={2}
              maxValue={20}
              defaultValue={[2, 3]}
              color="foreground"
              label="Person Capacity"
              className="w-1/2 font-medium"
              onChangeEnd={(capacityRangeValue) => {
                setValue("capacity", capacityRangeValue);
              }}
            />
          </div>
          <PlusCheckboxGroup
            label="Amenities"
            options={["PARKING", "WIFI"]}
            register={register("amenities")}
          />
          <PlusCheckboxGroup
            label="Room Type"
            options={["ONE_BHK", "TWO_BHK", "FLAT"]}
            register={register("roomtype")}
          />
          <PlusCheckboxGroup
            label="Furnishing Status"
            options={["FURNISHED", "SEMIFURNISHED", "UNFURNISHED"]}
            register={register("furnishingstatus")}
          />
          <PlusCheckboxGroup
            label="Posted By"
            options={["OWNER", "BROKER", "USER"]}
            register={register("postedby")}
          />
          {/* <CheckedBox
            label="Verified"
            value={verified ?? false}
            register={register("verified")}
            onChange={(e) => setValue("verified", e.target.checked)}
          /> */}
        </div>
      </div>

      <div className="max-sm:h-[5vh] col-span-2 p-1 max-sm:col-span-3 place-content-center max-sm:border-2 max-sm:rounded-xl border-r-[1px] border-black">
        <input
          type="text"
          list="Cities"
          value={selectedCity}
          {...register("city")}
          onKeyDown={handleCityKeyDown}
          className="w-full h-full text-lg"
        />
        <datalist id="Cities">
          {cachedData &&
            cachedData[activeTab] &&
            Object.keys(cachedData[activeTab]).map((city, index) => {
              return (
                <option key={index} value={city}>
                  {city}
                </option>
              );
            })}
        </datalist>
      </div>

      <div className="max-sm:h-[5vh] col-span-5 p-1 max-sm:col-span-6 place-content-center max-sm:border-2 max-sm:border-black max-sm:rounded-xl ">
        <input
          type="text"
          list="Locations"
          {...register("location")}
          onKeyDown={handleLocationKeyDown}
          disabled={
            !(
              (cachedData?.[activeTab] as { [key: string]: string[] | [] })?.[
                selectedCity
              ]?.length > 0
            )
          }
          className={`w-full h-full text-lg`}
        />
        <datalist id="Locations">
          {cachedData &&
            (cachedData[activeTab] as { [key: string]: string[] | [] })[
              selectedCity
            ]?.map((location, index) => {
              return <option key={index} value={location} />;
            })}
        </datalist>
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
        <Slider
          step={500}
          size="sm"
          minValue={0}
          maxValue={50000}
          color="foreground"
          label="Price Range"
          defaultValue={[0, 10000]}
          className="w-full font-medium"
          formatOptions={{ style: "currency", currency: "NPR" }}
          onChangeEnd={(priceRangeValue) => {
            setValue("price", priceRangeValue);
          }}
        />

        <div className="flex gap-4">
          <Slider
            step={1}
            size="sm"
            minValue={0}
            maxValue={5}
            label="Rating"
            defaultValue={[0, 5]}
            color="foreground"
            className="w-1/2 font-medium"
            onChangeEnd={(ratingValue) => {
              setValue("rating", ratingValue);
            }}
          />

          <Slider
            step={1}
            size="sm"
            minValue={2}
            maxValue={20}
            defaultValue={[2, 3]}
            color="foreground"
            label="Person Capacity"
            className="w-1/2 font-medium"
            onChangeEnd={(capacityRangeValue) => {
              setValue("capacity", capacityRangeValue);
            }}
          />
        </div>

        <PlusCheckboxGroup
          label="Amenities"
          options={["PARKING", "WIFI"]}
          register={register("amenities")}
        />

        <PlusCheckboxGroup
          label="Room Type"
          options={["ONE_BHK", "TWO_BHK", "FLAT"]}
          register={register("roomtype")}
        />

        <PlusCheckboxGroup
          label="Furnishing Status"
          options={["FURNISHED", "SEMIFURNISHED", "UNFURNISHED"]}
          register={register("furnishingstatus")}
        />

        <PlusCheckboxGroup
          label="Posted By"
          options={["OWNER", "BROKER", "USER"]}
          register={register("postedby")}
        />

        <CheckedBox
          label="Verified"
          value={verified ?? false}
          register={register("verified")}
          onChange={(e) => setValue("verified", e.target.checked)}
        />
      </div>
    </form>
  );
};

export default SearchForm;
