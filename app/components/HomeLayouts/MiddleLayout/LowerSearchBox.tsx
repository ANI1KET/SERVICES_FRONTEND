// "use client";

// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const LowerSearchBox = () => {
//   const [query, setQuery] = useState("");
//   const [cityQuery, setCityQuery] = useState("");
//   const [typePanel, setTypePanel] = useState(false);
//   const [cityPanel, setCityPanel] = useState(false);

//   return (
//     <div className="w-full h-[6vh] flex gap-2 relative">
//       <div
//         className="w-[12.5%] border-r-[1px] border-black text-lg flex items-center justify-evenly cursor-pointer "
//         onClick={() => {
//           setTypePanel(!typePanel);
//         }}
//         onMouseEnter={() => setTypePanel(true)}
//         onMouseLeave={() => setTypePanel(false)}
//       >
//         <span>Type</span>
//         {typePanel ? (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-chevron-up"
//           >
//             <path d="m18 15-6-6-6 6" />
//           </svg>
//         ) : (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-chevron-down"
//           >
//             <path d="m6 9 6 6 6-6" />
//           </svg>
//         )}
//       </div>
//       <div
//         className="w-[12.5%] border-r-[1px] border-black text-lg flex items-center justify-evenly cursor-pointer "
//         onClick={() => {
//           setCityPanel(!cityPanel);
//         }}
//       >
//         City
//         {cityPanel ? (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-chevron-up"
//           >
//             <path d="m18 15-6-6-6 6" />
//           </svg>
//         ) : (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-chevron-down"
//           >
//             <path d="m6 9 6 6 6-6" />
//           </svg>
//         )}
//       </div>

//       <form className="w-[75%] p-1 flex gap-1">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-5/6 h-full "
//         />
//         <button className="w-1/6 text-white text-xl rounded-md border-[1px] m-1 border-black bg-black">
//           Search
//         </button>
//       </form>

//       <AnimatePresence>
//         {typePanel && (
//           <motion.div
//             initial={{ scale: 0.2, opacity: 1 }}
//             animate={{ scale: [0.4, 0.6, 0.8, 1], opacity: 1 }}
//             exit={{
//               scale: [1, 0.8, 0.5, 0.3, 0],
//               transition: {
//                 duration: 0.3,
//                 ease: [0.42, 0, 0.58, 1],
//               },
//             }}
//             transition={{
//               type: "spring",
//               stiffness: 70,
//               damping: 15,
//               duration: 0.3,
//             }}
//             className="absolute top-[6.2vh] left-[-0.16rem] right-0 h-[40vh] w-[71vw] rounded-2xl border-2 border-black bg-white "
//           ></motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {cityPanel && (
//           <motion.div
//             initial={{ scale: 0.2, opacity: 1 }}
//             animate={{ scale: [0.4, 0.6, 0.8, 1], opacity: 1 }}
//             exit={{
//               scale: [1, 0.8, 0.5, 0.3, 0],
//               transition: {
//                 duration: 0.3,
//                 ease: [0.42, 0, 0.58, 1],
//               },
//             }}
//             transition={{
//               type: "spring",
//               stiffness: 70,
//               damping: 15,
//               duration: 0.3,
//             }}
//             className="absolute top-[6.2vh] left-[12%] w-[13.5%] h-[25vh] rounded-2xl border-2 border-black bg-white "
//           ></motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default LowerSearchBox;

"use client";

import { useState } from "react";

const LowerSearchBox = () => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("biratnagar");
  console.log(selectedCity);

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

      <div className="w-[19%] border-r-[1px] border-black cursor-pointer ">
        <input
          type="text"
          list="Cities"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full h-[5.4vh] mt-[0.1rem] "
        />
        <datalist id="Cities">
          <option value="abc" />
          <option value="cde" />
          <option value="efg" />
          <option value="ghi" />
          <option value="jkl" />
        </datalist>
      </div>

      <form
        className="w-[70%] p-1 flex gap-1"
        // onSubmit={}
      >
        <input
          type="text"
          list="Locations"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-5/6 h-full"
        />
        <datalist id="Locations">
          <option value="abc" />
          <option value="cde" />
          <option value="efg" />
          <option value="ghi" />
          <option value="jkl" />
        </datalist>
        <button className="w-1/6 text-white text-xl rounded-md border-[1px] border-black bg-black">
          Search
        </button>
      </form>
    </div>
  );
};

export default LowerSearchBox;
