"use client";

import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import {
  useAppSelector,
  useLazyGetRoomCityLocationsQuery,
  useLazyGetRoomLocationsQuery,
} from "@/app/store/hooks/hooks";
import RoomApi from "@/app/store/slices/roomApiSlice";

const SearchForm: React.FC = () => {
  const activeTab = useAppSelector((state) => state.tabs.activeTabs.SearchTab);
  const cachedData = useAppSelector(
    (state) =>
      RoomApi.endpoints.getRoomLocations.select({ category: activeTab })(state)
        .data
  );

  useEffect(() => {
    setValue("city", cachedData?.city ?? "");
    setValue("location", "");
  }, [cachedData]);

  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState<boolean>(true);

  const {
    formState: { errors },
    watch,
    register,
    setValue,
    setFocus,
    setError,
    clearErrors,
    handleSubmit,
  } = useForm<{ city: string; location: string }>({
    defaultValues: {
      city: "",
      location: "",
    },
  });

  const selectedCity = watch("city");

  const [
    triggerGetRoomLocations,
    {
      data: roomLocationsData,
      error: roomLocationsError,
      isLoading: roomLocationsLoading,
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
      error: roomCityLocationsError,
      isLoading: roomCityLocationsLoading,
    },
  ] = useLazyGetRoomCityLocationsQuery();
  useEffect(() => {
    setFocus("location");
  }, [roomCityLocationsData]);

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  const clearInputErrors = (field: "city" | "location") => clearErrors(field);
  const handleError = useCallback(
    (field: "city" | "location", message: string) => {
      setError(field, { type: "manual", message });
    },
    [setError]
  );

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
      clearInputErrors("city");
    } else if (
      cachedData !== undefined &&
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
      clearErrors("city");
    } else {
      handleError("city", "Currently, service is not available in the city.");
    }

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
      clearInputErrors("location");
    } else if (location) {
      handleError(
        "location",
        "Service not available in this location right now."
      );
    } else {
      clearErrors("location");
    }
  };

  const onSubmit = (data: { city: string; location: string }) => {
    console.log("object");
    // if (!data.city) {
    //   handleError("city", "Please select the city.");
    //   return;
    // } else if (!cities.has(selectedCity)) {
    //   handleError("city", "Currently, service is not available in the city.");
    //   return;
    // }
    // console.log("Submitted data:", data, selectedLocation);
  };
  return (
    <form
      className="grid grid-cols-9 gap-1 w-full h-1/2 max-sm:h-[12vh] relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="max-sm:hidden col-span-1 max-sm:col-span-3 grid grid-flow-col place-content-center place-items-center border-r-[1px] border-black h-full cursor-pointer group ">
        <p>Type</p>
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
        <div className="w-full h-[40vh] p-2 absolute top-full left-0 right-0 rounded-2xl border-2 border-black bg-white opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300">
          ANIKET
        </div>
      </div>

      <div className="col-span-2 p-1 max-sm:col-span-3 place-content-center max-sm:border-2 max-sm:rounded-xl border-r-[1px] border-black">
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

      <div className="col-span-5 p-1 max-sm:col-span-6 place-content-center max-sm:border-2 max-sm:border-black max-sm:rounded-xl ">
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
              console.log(location);
              return <option key={index} value={location} />;
            })}
        </datalist>
      </div>

      {/* {(selectedLocation.length > 0 ||
        errors.city?.message ||
        errors.location?.message) && (
        <div className="hidden max-sm:block col-span-7 place-content-center border-2 border-black rounded-xl">
          <span className="text-red-500 ">
            {errors.city?.message || errors.location?.message}
          </span>
          {selectedLocation.length > 0 && (
            <div
              className={`overflow-scroll absolute right-2  ${
                isLocationPanelOpen ? "" : "top-1"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-chevron-up cursor-pointer transition-all duration-300 ${
                  isLocationPanelOpen ? "rotate-180" : ""
                }`}
                onClick={() => setIsLocationPanelOpen(!isLocationPanelOpen)}
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </div>
          )}
          {selectedLocation.map((location, index) => {
            return (
              <span key={index} className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                {location}
              </span>
            );
          })}
        </div>
      )} */}

      <div className="col-span-1 max-sm:col-span-2 max-sm:col-start-8 place-content-center text-center bg-black max-sm:rounded-lg rounded-br-lg">
        <button type="submit" className={`text-white text-xl`}>
          Search
        </button>
      </div>

      {(selectedLocation.length > 0 ||
        errors.city?.message ||
        errors.location?.message) && (
        <div
          className={`max-sm:hidden absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%+0.64rem)] col-span-7 col-start-2 place-content-center p-1 bg-white border-b-2 border-r-2 border-l-2 border-black rounded-b-xl  ${
            isLocationPanelOpen ? "" : "h-[4.5vh]"
          } overflow-hidden`}
        >
          <span className="text-red-500 ">
            {errors.city?.message || errors.location?.message}
          </span>
          {selectedLocation.length > 0 && (
            <div
              className={`absolute right-2  ${
                isLocationPanelOpen ? "" : "top-1"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-chevron-up cursor-pointer transition-all duration-300 ${
                  isLocationPanelOpen ? "rotate-180" : ""
                }`}
                onClick={() => setIsLocationPanelOpen(!isLocationPanelOpen)}
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </div>
          )}
          {selectedLocation.map((location, index) => {
            return (
              <span key={index} className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                {location}
              </span>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default SearchForm;
