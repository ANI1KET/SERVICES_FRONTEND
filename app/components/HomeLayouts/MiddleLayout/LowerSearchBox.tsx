"use client";

import { useEffect } from "react";
// import { useCallback, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { AnimatePresence, motion } from "framer-motion";

import {
  useAppSelector,
  useLazyGetRoomLocationsQuery,
} from "@/app/store/hooks/hooks";

const LowerSearchBox = () => {
  const { SearchTab } = useAppSelector((state) => state.tabs.activeTabs);
  const [triggerGetRoomLocations, { data, error, isLoading }] =
    useLazyGetRoomLocationsQuery();
  console.log(data, error, isLoading);

  useEffect(() => {
    triggerGetRoomLocations(SearchTab);
  }, []);

  // const {
  //   formState: { errors },
  //   register,
  //   handleSubmit,
  //   setValue,
  //   setError,
  //   clearErrors,
  //   watch,
  //   setFocus,
  // } = useForm<{ city: string; location: string }>({
  //   defaultValues: {
  //     city: "",
  //     location: "",
  //   },
  // });
  // const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  // const [isLocationPanelOpen, setIsLocationPanelOpen] = useState<boolean>(true);

  // const selectedCity = watch("city");

  // const handleError = useCallback(
  //   (field: "city" | "location", message: string) => {
  //     setError(field, { type: "manual", message });
  //   },
  //   [setError]
  // );

  // const removeLocation = (indexToRemove: number) => {
  //   setSelectedLocation((prevLocations) =>
  //     prevLocations.filter((_, index) => index !== indexToRemove)
  //   );
  //   setFocus("location");
  // };

  // const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     const capitalizedCity =
  //       selectedCity.charAt(0).toUpperCase() +
  //       selectedCity.slice(1).toLowerCase();

  //     if (!selectedCity) {
  //       clearErrors("city");
  //     } else if (cities.has(capitalizedCity)) {
  //       setValue("city", capitalizedCity);
  //       clearErrors("city");
  //       setFocus("location");

  //       // triggerGetRoomLocations(SearchTab);
  //     } else {
  //       handleError("city", "Currently, service is not available in the city.");
  //     }

  //     setSelectedLocation([]);
  //   }
  // };

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

  // const onSubmit = (data: { city: string; location: string }) => {
  //   if (!data.city) {
  //     handleError("city", "Please select the city.");
  //     return;
  //   } else if (!cities.has(selectedCity)) {
  //     handleError("city", "Currently, service is not available in the city.");
  //     return;
  //   }
  //   console.log("Submitted data:", data, selectedLocation);
  // };

  return (
    <></>
    // <div className="w-full h-[5.8vh] flex gap-2 relative">
    //   <div className="w-[12%] border-r-[1px] border-black text-lg flex items-center justify-evenly cursor-pointer group">
    //     <span>Type</span>
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="1.5"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="lucide lucide-chevron-up group-hover:scale-125 group-hover:rotate-180 transition-all duration-300"
    //     >
    //       <path d="m18 15-6-6-6 6" />
    //     </svg>
    //     <div className="absolute top-[6.2vh] left-[-0.16rem] right-0 p-2 w-[71vw] h-[40vh] rounded-2xl border-2 border-black bg-white opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300">
    //       eaffa
    //     </div>
    //   </div>

    //   <form
    //     className="w-[88%] flex flex-col gap-1"
    //     onSubmit={handleSubmit(onSubmit)}
    //   >
    //     <div className="w-full flex gap-1">
    //       <div className="w-[18%] border-r-[1px] border-black cursor-pointer">
    //         <input
    //           type="text"
    //           list="Cities"
    //           {...register("city")}
    //           onKeyDown={handleCityKeyDown}
    //           className="w-full h-[5.4vh] mt-[0.1rem]"
    //         />
    //         <datalist id="Cities">
    //           {[...cities].map((city, index) => (
    //             <option key={index} value={city} />
    //           ))}
    //         </datalist>
    //       </div>

    //       <div className="w-full p-1 relative ">
    //         <input
    //           type="text"
    //           list="Locations"
    //           {...register("location")}
    //           className={`w-[85%] h-full `}
    //           onKeyDown={handleLocationKeyDown}
    //           disabled={!cities.has(selectedCity)}
    //         />
    //         <datalist id="Locations">
    //           {[...locations].map((location, index) => (
    //             <option key={index} value={location} />
    //           ))}
    //         </datalist>
    //         <button
    //           type="submit"
    //           className="w-[15%] h-full mx-auto text-white text-xl rounded-md bg-black"
    //         >
    //           Search
    //         </button>

    //         <AnimatePresence>
    //           {(selectedLocation.length > 0 ||
    //             errors.city?.message ||
    //             errors.location?.message) && (
    //             <motion.div
    //               key="location-panel"
    //               initial={{ opacity: 0, scale: 0.8 }}
    //               animate={{ opacity: 1, scale: 1 }}
    //               exit={{ opacity: 0, scale: 0.8 }}
    //               transition={{ duration: 0.3 }}
    //               className={`absolute top-[6vh] right-0 -left-1 border-2 border-black rounded-xl bg-white p-2 ${
    //                 isLocationPanelOpen ? "" : "h-[5vh]"
    //               } overflow-hidden`}
    //             >
    //               <span className="text-red-500 ">
    //                 {errors.city?.message || errors.location?.message}
    //               </span>
    //               <motion.div className="absolute right-2">
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   width="24"
    //                   height="24"
    //                   viewBox="0 0 24 24"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   strokeWidth="1.5"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   className={`lucide lucide-chevron-up transition-all duration-300 ${
    //                     isLocationPanelOpen ? "rotate-180" : ""
    //                   }`}
    //                   onClick={() =>
    //                     setIsLocationPanelOpen(!isLocationPanelOpen)
    //                   }
    //                 >
    //                   <path d="m18 15-6-6-6 6" />
    //                 </svg>
    //               </motion.div>
    //               <div className="flex flex-col">
    //                 {selectedLocation.map((location, index) => {
    //                   return (
    //                     <span key={index} className="flex gap-2">
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="24"
    //                         height="24"
    //                         viewBox="0 0 24 24"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         strokeWidth="1.5"
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         className="lucide lucide-x cursor-pointer"
    //                         onClick={() => removeLocation(index)}
    //                       >
    //                         <path d="M18 6 6 18" />
    //                         <path d="m6 6 12 12" />
    //                       </svg>
    //                       {location}
    //                     </span>
    //                   );
    //                 })}
    //               </div>
    //             </motion.div>
    //           )}
    //         </AnimatePresence>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
};

export default LowerSearchBox;
