// "use client";

// import { useEffect, useRef, useState } from "react";

// import UpperSearchBox from "@/app/components/HomeLayouts/UpperLayout/UpperSearchBox";
// import LowerSearchBox from "./UpperLayout/LowerSearchBox";

// const UpperLayout: React.FC = () => {
//   const firstDivRef = useRef<HTMLDivElement | null>(null);
//   const [showSecondDiv, setShowSecondDiv] = useState(false);

//   useEffect(() => {
//     let scrollTimeout: number | null = null;

//     const handleScroll = () => {
//       if (scrollTimeout) return;
//       scrollTimeout = window.requestAnimationFrame(() => {
//         scrollTimeout = null;
//         if (firstDivRef.current) {
//           setShowSecondDiv(
//             firstDivRef.current.getBoundingClientRect().bottom < 0
//           );
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
//     };
//   }, []);

//   return (
//     <>
//       <div ref={firstDivRef} className="h-[50vh] bg-red-500 ">
//         <div className="w-3/4 max-sm:w-full max-sm:rounded-3xl mx-auto h-24 absolute top-1/2 transform -translate-y-1/2 left-0 right-0 rounded-2xl shadow-2xl drop-shadow-xl flex flex-col ">
//           <UpperSearchBox />
//           <hr />
//           <LowerSearchBox />
//         </div>
//       </div>

//       {showSecondDiv && (
//         <div className="sticky top-[-1px] bg-green-500 animate-fadeIn h-16"></div>
//       )}
//     </>
//   );
// };

// export default UpperLayout;

const UpperLayout = () => {
  return <div className="h-[50vh] bg-red-500 "></div>;
};

export default UpperLayout;
