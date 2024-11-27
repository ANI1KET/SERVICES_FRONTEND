// "use client";

// import { useState } from "react";

// const LoadMoreCityLocations = ({
//   children,
//   initialOffset,
//   loadMoreCityLocationsAction,
// }: React.PropsWithChildren<{
//   initialOffset: number;
//   loadMoreCityLocationsAction: (params: {
//     offset: number;
//   }) => Promise<readonly [JSX.Element, number | null]>;
// }>) => {
//   const [locations, setLocations] = useState<JSX.Element[]>([]);
//   const [offset, setOffset] = useState<number | null>(initialOffset);
//   const [loading, setLoading] = useState(false);

//   const handleLoadMore = async () => {
//     if (offset === null) return;
//     setLoading(true);

//     const [newLocations, nextOffset] = await loadMoreCityLocationsAction({
//       offset,
//     });

//     setLocations((prev) => [...prev, newLocations]);
//     setOffset(nextOffset);
//     setLoading(false);
//   };

//   return (
//     <div>
//       {children}
//       {locations}
//       {offset !== null && (
//         <button onClick={handleLoadMore} disabled={loading}>
//           {loading ? "Loading..." : "Load More"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default LoadMoreCityLocations;

"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type LoadMoreCityLocationsProps = React.PropsWithChildren<{
  initialOffset: number;
  loadMoreCityLocationsAction: (params: {
    offset: number;
  }) => Promise<readonly [JSX.Element, number | null]>;
}>;

const LoadMoreCityLocations = ({
  children,
  initialOffset,
  loadMoreCityLocationsAction,
}: LoadMoreCityLocationsProps) => {
  const [locations, setLocations] = useState<JSX.Element[]>([]);
  const [offset, setOffset] = useState<number | null>(initialOffset);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(async () => {
    if (offset === null || loading) return;

    setLoading(true);

    const [newLocations, nextOffset] = await loadMoreCityLocationsAction({
      offset,
    });

    setLocations((prev) => [...prev, newLocations]);
    setOffset(nextOffset);
    setLoading(false);
  }, [offset, loading, loadMoreCityLocationsAction]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleLoadMore]);

  return (
    <div className="grid grid-cols-[2fr_5fr] max-sm:grid-cols-[2fr_2fr]">
      <div className=""></div>
      <div className="">
        {children}
        {locations}
        {offset !== null && <div ref={observerRef} style={{ height: "1px" }} />}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default LoadMoreCityLocations;
