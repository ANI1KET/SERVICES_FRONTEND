// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { AnimatePresence, motion } from "framer-motion";

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
//   "ghf344f443f44f4f43f4f      4r4r4r3 r34ri",
//   "jkl",
// ]);

// const LowerSearchBox = () => {
//   const {
//     formState: { errors },
//     register,
//     handleSubmit,
//     setValue,
//     setError,
//     clearErrors,
//     watch,
//     setFocus,
//   } = useForm<{ city: string; location: string[] }>({
//     defaultValues: {
//       city: "",
//       location: [],
//     },
//   });
//   const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

//   const selectedCity = watch("city");

//   const removeLocation = (indexToRemove: number) => {
//     setSelectedLocation((prevLocations) =>
//       prevLocations.filter((_, index) => index !== indexToRemove)
//     );
//     setFocus("location");
//   };

//   const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const capitalizedCity =
//         selectedCity.charAt(0).toUpperCase() +
//         selectedCity.slice(1).toLowerCase();

//       if (cities.has(capitalizedCity)) {
//         setValue("city", capitalizedCity);
//         clearErrors("city");
//         setFocus("location");
//       } else {
//         setError("city", {
//           type: "manual",
//           message: "Currently, service is not available in the city.",
//         });
//       }
//     }
//   };

//   const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const location = e.currentTarget.value;
//       if (locations.has(location)) {
//         setSelectedLocation((prevSelectedLocations) => {
//           if (!prevSelectedLocations.includes(location)) {
//             return [...prevSelectedLocations, location];
//           }
//           return prevSelectedLocations;
//         });
//         clearErrors("location");
//       } else if (location) {
//         setError("location", {
//           type: "manual",
//           message: "Service not available in this location right now.",
//         });
//       } else {
//         clearErrors("location");
//       }
//     }
//   };

//   const onSubmit = (data: { city: string; location: string[] }) => {
//     console.log("Submitted data:", data);
//   };
//   console.log(selectedLocation.length);

//   return (
//     <div className="w-full h-[5.8vh] flex gap-2 relative">
//       <div className="w-[11%] border-r-[1px] border-black text-lg flex items-center justify-evenly cursor-pointer group">
//         <span>Type</span>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="lucide lucide-chevron-up group-hover:scale-125 group-hover:rotate-180 transition-all duration-300"
//         >
//           <path d="m18 15-6-6-6 6" />
//         </svg>
//         <div className="absolute top-[6.2vh] left-[-0.16rem] right-0 p-2 w-[71vw] h-[40vh] rounded-2xl border-2 border-black bg-white opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300">
//           eaffa
//         </div>
//       </div>

//       <form
//         className="w-[89%] flex flex-col gap-1"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <div className="w-full flex gap-1">
//           <div className="w-[19%] border-r-[1px] border-black cursor-pointer">
//             <input
//               type="text"
//               list="Cities"
//               {...register("city")}
//               onKeyDown={handleCityKeyDown}
//               className="w-full h-[5.4vh] mt-[0.1rem]"
//             />
//             <datalist id="Cities">
//               {[...cities].map((city, index) => (
//                 <option key={index} value={city} />
//               ))}
//             </datalist>
//           </div>

//           <div className="w-full p-1 ">
//             <input
//               type="text"
//               list="Locations"
//               {...register("location")}
//               className={`w-[85%] h-full`}
//               style={{ paddingLeft: `${selectedLocation.length * 20}%` }}
//               onKeyDown={handleLocationKeyDown}
//               disabled={!cities.has(selectedCity)}
//             />
//             <datalist id="Locations">
//               {[...locations].map((location, index) => (
//                 <option key={index} value={location} />
//               ))}
//             </datalist>
//             <div className="absolute top-0 flex gap-2 h-full ">
//               {selectedLocation &&
//                 selectedLocation.map((location, index) => (
//                   <span
//                     key={index}
//                     className="flex border-2 border-black rounded-2xl p-2 "
//                   >
//                     {location.length > 7
//                       ? `${location.slice(0, 7)}...`
//                       : location}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-x"
//                       onClick={() => removeLocation(index)}
//                     >
//                       <path d="M18 6 6 18" />
//                       <path d="m6 6 12 12" />
//                     </svg>
//                   </span>
//                 ))}
//             </div>
//             <button
//               type="submit"
//               className="w-[15%] h-full mx-auto text-white text-xl rounded-md border-[1px] border-black bg-black"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {(errors.city || errors.location) && (
//             <motion.div
//               key="error-message"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.3 }}
//               className="w-full absolute top-[5.9vh] left-0"
//             >
//               <p className="text-black w-fit mx-auto rounded-b-lg p-1 bg-red-500">
//                 {errors.city?.message || errors.location?.message}
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </form>
//     </div>
//   );
// };

// export default LowerSearchBox;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

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
  "ghf344f443f44f4f43f4f      4r4r4r3 r34ri",
  "jkl",
]);

const LowerSearchBox = () => {
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
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState<boolean>(true);

  const selectedCity = watch("city");

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

      if (cities.has(capitalizedCity)) {
        setValue("city", capitalizedCity);
        clearErrors("city");
        setFocus("location");
      } else {
        setError("city", {
          type: "manual",
          message: "Currently, service is not available in the city.",
        });
      }

      // setSelectedLocation([]);
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
        setError("location", {
          type: "manual",
          message: "Service not available in this location right now.",
        });
      } else {
        clearErrors("location");
      }
    }
  };

  const onSubmit = (data: { city: string; location: string }) => {
    console.log("Submitted data:", data, selectedLocation);
  };
  console.log(isLocationPanelOpen);

  return (
    <div className="w-full h-[5.8vh] flex gap-2 relative">
      <div className="w-[12%] border-r-[1px] border-black text-lg flex items-center justify-evenly cursor-pointer group">
        <span>Type</span>
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
          className="lucide lucide-chevron-up group-hover:scale-125 group-hover:rotate-180 transition-all duration-300"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
        <div className="absolute top-[6.2vh] left-[-0.16rem] right-0 p-2 w-[71vw] h-[40vh] rounded-2xl border-2 border-black bg-white opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300">
          eaffa
        </div>
      </div>

      <form
        className="w-[88%] flex flex-col gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex gap-1">
          <div className="w-[18%] border-r-[1px] border-black cursor-pointer">
            <input
              type="text"
              list="Cities"
              {...register("city")}
              onKeyDown={handleCityKeyDown}
              className="w-full h-[5.4vh] mt-[0.1rem]"
            />
            <datalist id="Cities">
              {[...cities].map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          <div className="w-full p-1 relative ">
            <input
              type="text"
              list="Locations"
              {...register("location")}
              className={`w-[85%] h-full `}
              onKeyDown={handleLocationKeyDown}
              disabled={!cities.has(selectedCity)}
            />
            <datalist id="Locations">
              {[...locations].map((location, index) => (
                <option key={index} value={location} />
              ))}
            </datalist>
            <button
              type="submit"
              className="w-[15%] h-full mx-auto text-white text-xl rounded-md border-[1px] border-black bg-black"
            >
              Search
            </button>

            <AnimatePresence>
              {(selectedLocation.length !== 0 ||
                errors.city?.message ||
                errors.location?.message) && (
                <motion.div
                  key="location-panel"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-[6vh] right-0 -left-1 border-2 border-black rounded-xl bg-white p-2 ${
                    isLocationPanelOpen ? "h-[5vh]" : ""
                  } overflow-hidden`}
                >
                  <span className="text-red-500 ">
                    {errors.city?.message || errors.location?.message}
                  </span>
                  <motion.div className="absolute right-2">
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
                      className="lucide lucide-chevron-up group-hover:scale-125 group-hover:rotate-180 transition-all duration-300"
                      onClick={() =>
                        setIsLocationPanelOpen(!isLocationPanelOpen)
                      }
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </motion.div>
                  <div className="flex flex-col">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LowerSearchBox;
