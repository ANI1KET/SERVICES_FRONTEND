import SearchForm from "@/app/lib/ui/SearchForm";

const LowerSearchBox = () => {
  return (
    <>
      <SearchForm />
      {/* <AnimatePresence>
        {(selectedLocation.length > 0 ||
          errors.city?.message ||
          errors.location?.message) && (
          <motion.div
            key="location-panel"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-[6vh] right-0 -left-1 border-2 border-black rounded-xl bg-white p-2 ${
              isLocationPanelOpen ? "" : "h-[5vh]"
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
                className={`lucide lucide-chevron-up transition-all duration-300 ${
                  isLocationPanelOpen ? "rotate-180" : ""
                }`}
                onClick={() => setIsLocationPanelOpen(!isLocationPanelOpen)}
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
      </AnimatePresence> */}
    </>
  );
};

export default LowerSearchBox;

// import React from "react";

// import SearchForm from "@/app/lib/ui/SearchForm";

// const SearchPanel = () => {
//   return <SearchForm />;
// };

// export default SearchPanel;
