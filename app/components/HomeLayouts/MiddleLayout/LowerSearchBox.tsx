"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

const cities = ["Biratnagar", "Kathmandu", "Pokhara", "Janakpur", "Birjung"];
const locations = ["abc", "cde", "efg", "ghi", "jkl"];

const formSchema = z.object({
  // city: z.string().refine((val) => cities.includes(val), {
  //   message: "Currently, service is not available in your city.",
  // }),
  city: z.string(),
  location: z.string().refine((val) => locations.includes(val), {
    message: "Please select a valid location.",
  }),
});

type FormData = z.infer<typeof formSchema>;

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
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      location: "",
    },
  });

  const selectedCity = watch("city");

  const onSubmit = (data: FormData) => {
    console.log("Submitted data:", data);
  };

  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const capitalizedCity =
        selectedCity.charAt(0).toUpperCase() +
        selectedCity.slice(1).toLowerCase();

      if (!cities.includes(capitalizedCity)) {
        setError("city", {
          type: "manual",
          message: "Currently, service is not available in your city.",
        });
      } else {
        setValue("city", capitalizedCity);
        clearErrors("city");
        setFocus("location");
      }
    }
  };

  return (
    <div className="w-full h-[5.8vh] flex gap-2 relative">
      <div className="w-[11%] border-r-[1px] border-black text-lg flex items-center justify-evenly cursor-pointer group">
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

      <form className="w-[89%] flex gap-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[19%] border-r-[1px] border-black cursor-pointer">
          <input
            type="text"
            list="Cities"
            {...register("city")}
            onKeyDown={handleCityKeyDown}
            className="w-full h-[5.4vh] mt-[0.1rem]"
          />
          <datalist id="Cities">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        <div className="w-full p-1">
          <input
            type="text"
            list="Locations"
            {...register("location")}
            className="w-5/6 h-full"
            disabled={!cities.includes(selectedCity)}
          />
          <datalist id="Locations">
            {locations.map((location, index) => (
              <option key={index} value={location} />
            ))}
          </datalist>
          <button
            type="submit"
            className="w-1/6 text-white text-xl rounded-md border-[1px] border-black bg-black"
          >
            Search
          </button>
        </div>

        <AnimatePresence>
          {(errors.city || errors.location) && (
            <motion.div
              key="error-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="w-full absolute top-[5.9vh] left-0"
            >
              <p className="text-black w-fit mx-auto rounded-b-lg p-1 bg-red-500">
                {errors.city?.message || errors.location?.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default LowerSearchBox;
