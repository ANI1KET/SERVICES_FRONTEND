"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  useAppSelector,
  useLazyGetRoomLocationsQuery,
} from "@/app/store/hooks/hooks";

const SearchForm = () => {
  const activeTab = useAppSelector((state) => state.tabs.activeTabs.SearchTab);
  const [triggerGetRoomLocations, { data, error, isLoading }] =
    useLazyGetRoomLocationsQuery();
  console.log("! ", { data, error, isLoading });

  useEffect(() => {
    triggerGetRoomLocations({ category: activeTab });
  }, []);

  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState<boolean>(true);

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    setFocus,
  } = useForm<{ city: string; location: string }>({
    defaultValues: {
      city: "",
      location: "",
    },
  });

  const selectedCity = watch("city");

  const handleError = useCallback(
    (field: "city" | "location", message: string) => {
      setError(field, { type: "manual", message });
    },
    [setError]
  );

  const removeLocation = (indexToRemove: number) => {
    setSelectedLocation((prevLocations) =>
      prevLocations.filter((_, index) => index !== indexToRemove)
    );
    setFocus("location");
  };

  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const capitalizedCity =
        selectedCity.charAt(0).toUpperCase() +
        selectedCity.slice(1).toLowerCase();

      if (!selectedCity) {
        clearErrors("city");
      } else if (
        data !== undefined &&
        Object.keys(data[activeTab]).includes(capitalizedCity)
      ) {
        setValue("city", capitalizedCity);
        clearErrors("city");
        setFocus("location");

        // triggerGetRoomLocations(activeTab);
      } else {
        handleError("city", "Currently, service is not available in the city.");
      }

      setSelectedLocation([]);
    }
  };

  // const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     const location = e.currentTarget.value;
  //     if (locations.has(location)) {
  //       e.currentTarget.value = "";
  //       setSelectedLocation((prevSelectedLocations) => {
  //         if (!prevSelectedLocations.includes(location)) {
  //           return [...prevSelectedLocations, location];
  //         }
  //         return prevSelectedLocations;
  //       });
  //       clearErrors("location");
  //     } else if (location) {
  //       handleError(
  //         "location",
  //         "Service not available in this location right now."
  //       );
  //     } else {
  //       clearErrors("location");
  //     }
  //   }
  // };

  const onSubmit = (data: { city: string; location: string }) => {
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
          {...register("city")}
          onKeyDown={handleCityKeyDown}
          className="w-full h-full text-xl"
        />
        <datalist id="Cities">
          {data &&
            Object.keys(data[activeTab])?.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </datalist>
      </div>

      <div className="col-span-5 p-1 max-sm:col-span-6 place-content-center max-sm:border-2 max-sm:border-black max-sm:rounded-xl ">
        <input
          type="text"
          list="Locations"
          {...register("location")}
          // onKeyDown={handleLocationKeyDown}
          // disabled={!cities.has(selectedCity)}
          className={`w-full h-full text-xl`}
        />
        <datalist id="Locations">
          {data &&
            data[activeTab]?.[selectedCity]?.map((location, index) => {
              return <option key={index} value={location} />;
            })}
        </datalist>
      </div>

      <div className="hidden max-sm:block col-span-7 place-content-center border-2 border-black rounded-xl">
        <p className={`text-xl`}>Search</p>
      </div>

      <div className="col-span-1 max-sm:col-span-2 place-content-center text-center bg-black max-sm:rounded-lg rounded-br-lg">
        <button type="submit" className={`text-white text-2xl`}>
          Search
        </button>
      </div>

      <div className="max-sm:hidden absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%+0.6rem)] col-span-7 col-start-2 place-content-center p-1 bg-white border-b-2 border-r-2 border-l-2 border-black rounded-b-xl">
        <p className={`text-black text-xl`}>Search</p>
      </div>
    </form>
  );
};

export default SearchForm;