// "use client";

// import { useCallback } from "react";

// import { SearchBoxTabs } from "@/app/lib/utils/tabs";
// import { setActiveTab } from "@/app/store/slices/tabSlice";
// import { useAppDispatch, useAppSelector } from "@/app/store/hooks/hooks";

// const cities: Set<string> = new Set([
//   "Biratnagar",
//   "Kathmandu",
//   "Pokhara",
//   "Janakpur",
//   "Birjung",
// ]);
// const locations: Set<string> = new Set([
//   "abjbjbjbbjjbbjjbjjjjjbjbjjjjbjjjj4f34f4f34c",
//   "bjjjjjjjjjjjjjjjjbcdef43f4f4f34f4f34f4f34",
//   "efgaf344g4t4t34t4gt43t4tf4f3f4f34f4f4f43f43f",
//   "ghf344f443f44f4f43f4f 4r4r4r3 r34ri",
//   "jkl",
// ]);

// const SearchPanel = () => {
//   const dispatch = useAppDispatch();
//   const activeTab = useAppSelector(
//     (state) => state.tabs.activeTabs["SearchTab"]
//   );

//   const handleTabClick = useCallback(
//     (label: string) => {
//       dispatch(setActiveTab({ componentId: "SearchTab", activeTab: label }));
//     },
//     [dispatch]
//   );
//   return (
//     <div className="flex flex-col gap-2">
//       <section className="h-[16vh] grid grid-cols-3 place-items-center uppercase rounded-3xl border-2 border-black ">
//         {SearchBoxTabs?.map(([label, content], index) => (
//           <div
//             key={index}
//             className={`cursor-pointer ${
//               activeTab === label
//                 ? "text-white rounded-full p-1 bg-black "
//                 : "text-black"
//             }`}
//             onClick={() => handleTabClick(label)}
//           >
//             {label}
//           </div>
//         ))}
//       </section>

//       <form className="w-full flex flex-row gap-1 border-2 border-black rounded-3xl ">
//         <div className="ml-1 p-2 border-r-2 border-black ">
//           <input type="text" list="Cities" />
//           <datalist id="Cities">
//             {[...cities].map((city, index) => (
//               <option key={index} value={city} />
//             ))}
//           </datalist>
//         </div>

//         <div className="flex flex-row justify-between w-full ">
//           <input type="text" list="Locations" className={`w-full `} />
//           <datalist id="Locations">
//             {[...locations].map((location, index) => (
//               <option key={index} value={location} />
//             ))}
//           </datalist>

//           <button
//             type="submit"
//             className="text-xl text-white rounded-lg bg-black m-1 mr-2"
//           >
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchPanel;

"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks/hooks";
import { setActiveTab } from "@/app/store/slices/tabSlice";
import { SearchBoxTabs } from "@/app/lib/utils/tabs";

const cities: Set<string> = new Set([
  "Biratnagar",
  "Kathmandu",
  "Pokhara",
  "Janakpur",
  "Birjung",
]);
const locations: Set<string> = new Set([
  "abjbjbjbbjjbbjjbjjjjjbjbjjjjbjjjj4f34f4f34c",
  "bjjjjjjjjjjjjjjjjbcdef43f4f4f34f4f34f4f34",
  "efgaf344g4t4t34t4gt43t4tf4f3f4f34f4f4f43f43f",
  "ghf344f443f44f4f43f4f 4r4r4r3 r34ri",
  "jkl",
]);

const SearchPanel = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state) => state.tabs.activeTabs["SearchTab"]
  );

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
    defaultValues: { city: "", location: "" },
  });

  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const selectedCity = watch("city");

  const handleTabClick = useCallback(
    (label: string) => {
      dispatch(setActiveTab({ componentId: "SearchTab", activeTab: label }));
    },
    [dispatch]
  );

  const handleError = useCallback(
    (field: "city" | "location", message: string) => {
      setError(field, { type: "manual", message });
    },
    [setError]
  );

  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const capitalizedCity =
        selectedCity.charAt(0).toUpperCase() +
        selectedCity.slice(1).toLowerCase();

      if (!selectedCity) {
        clearErrors("city");
      } else if (cities.has(capitalizedCity)) {
        setValue("city", capitalizedCity);
        clearErrors("city");
        setFocus("location");
      } else {
        handleError("city", "Currently, service is not available in the city.");
      }

      setSelectedLocation([]);
    }
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const location = e.currentTarget.value;
      if (locations.has(location)) {
        e.currentTarget.value = "";
        setSelectedLocation((prevSelectedLocations) => {
          if (!prevSelectedLocations.includes(location)) {
            return [...prevSelectedLocations, location];
          }
          return prevSelectedLocations;
        });
        clearErrors("location");
      } else if (location) {
        handleError(
          "location",
          "Service not available in this location right now."
        );
      } else {
        clearErrors("location");
      }
    }
  };

  const onSubmit = (data: { city: string; location: string }) => {
    if (!data.city) {
      handleError("city", "Please select the city.");
      return;
    } else if (!cities.has(selectedCity)) {
      handleError("city", "Service not available in this location right now.");
      return;
    }
    console.log("Submitted data:", data, selectedLocation);
  };

  return (
    <div className="flex flex-col gap-2">
      <section className="h-[16vh] grid grid-cols-3 place-items-center uppercase rounded-3xl border-2 border-black ">
        {SearchBoxTabs?.map(([label, content], index) => (
          <div
            key={index}
            className={`cursor-pointer ${
              activeTab === label
                ? "text-white rounded-full p-1 bg-black "
                : "text-black"
            }`}
            onClick={() => handleTabClick(label)}
          >
            {label}
          </div>
        ))}
      </section>

      <form
        className="w-full flex flex-col gap-1 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex gap-1 border-2 border-black rounded-xl">
          <div className="p-2 border-r-2 border-black w-[30%]">
            <input
              type="text"
              list="Cities"
              {...register("city")}
              onKeyDown={handleCityKeyDown}
              className="w-full"
            />
            <datalist id="Cities">
              {[...cities].map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          <div className="w-[70%] flex p-1 ">
            <input
              type="text"
              list="Locations"
              {...register("location")}
              className="w-full"
              onKeyDown={handleLocationKeyDown}
              disabled={!cities.has(selectedCity)}
            />
            <datalist id="Locations">
              {[...locations].map((location, index) => (
                <option key={index} value={location} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="w-full flex justify-end gap-1 ">
          {(errors.city || errors.location) && (
            <div className={`w-full border-2 border-black rounded-lg`}>
              <p className="text-red-500 text-sm">{errors.city?.message}</p>
              <p className="text-red-500 text-sm">{errors.location?.message}</p>
            </div>
          )}
          <button
            type="submit"
            className=" p-2 text-xl text-white rounded-xl bg-black"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchPanel;
