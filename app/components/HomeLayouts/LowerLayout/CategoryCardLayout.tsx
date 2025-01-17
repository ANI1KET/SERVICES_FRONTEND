'use client';

import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import ImageLoop from '@/app/lib/ui/ImageLoop';
import { getCategoryDetails } from './ServerAction';
import { CapacityIcon, HomeLocationIcon, PriceIcon } from '@/app/lib/icon/svg';

const PAGE_SIZE = 2;

const CategoryCardLayout: React.FC<{
  city: string;
  title: string;
  cities: { [key: string]: string[] };
}> = ({ city, cities, title }) => {
  const router = useRouter();
  const [City, setCity] = useState(city);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`${title}${City}`],
      queryFn: ({ pageParam = 0 }) =>
        getCategoryDetails({
          city: City,
          category: title,
          offset: pageParam,
        }),
      getNextPageParam: (lastPage, allPages) => {
        const currentOffset = allPages.length * PAGE_SIZE;
        return lastPage.length === PAGE_SIZE ? currentOffset : undefined;
      },
      initialPageParam: 0,
      gcTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 10,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '300px',
        threshold: 0,
      }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleLoadMore]);
  return (
    <div className="w-full ">
      <p className="text-2xl font-semibold text-center">
        {title.charAt(0).toUpperCase() + title.slice(1)}s
      </p>
      <div className="flex overflow-x-scroll border-[1px] border-black rounded-t-lg">
        {cities &&
          Object.keys(cities).map((city) => (
            <span
              key={city}
              onClick={() => setCity(city)}
              className={`p-2 border-r-[1px] border-black rounded-xl cursor-pointer 
                ${City === city ? 'bg-black text-white' : ''}
                `}
            >
              {city}
            </span>
          ))}
      </div>
      <div className="w-full flex overflow-x-auto ">
        <div className="flex ">
          {data?.pages.map((page, pageIndex) =>
            page.map((item, index: number) => (
              <div
                className="cursor-pointer"
                key={`${pageIndex}${index}`}
                onClick={() =>
                  router.push(`/room/${btoa(`${item.id},${City}`)}`)
                }
              >
                {item.videos ? (
                  <div className="w-[25vw] max-sm:w-[50vw] max-xsm:w-screen aspect-video ">
                    <ReactPlayer
                      loop
                      muted
                      playing
                      width="100%"
                      height="100%"
                      controls={false}
                      url={item.videos}
                      config={{
                        youtube: {
                          playerVars: {
                            rel: 0,
                            showinfo: 0,
                            disablekb: 1,
                            modestbranding: 1,
                          },
                        },
                      }}
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                ) : (
                  <div className="w-[25vw] max-sm:w-[50vw] max-xsm:w-screen relative aspect-video -z-10">
                    {item.photos && item.photos.length > 0 && (
                      <ImageLoop images={item.photos} />
                    )}
                  </div>
                )}
                <div
                  className="w-[25vw] max-sm:w-[50vw] max-xsm:w-screen grid grid-rows-2 grid-cols-2 gap-1 p-1  
                             border-r-[1px] border-l-[1px] border-b-[1px] border-black rounded-b-md"
                >
                  <p
                    className={`row-span-1 col-span-1 text-xl `}
                    title={`Minimum Person : ${item.mincapacity}\nMaximum Person : ${item.maxcapacity}`}
                  >
                    <span className="flex items-center gap-1">
                      <CapacityIcon size={20} />
                      {item.mincapacity}-{item.maxcapacity}
                    </span>
                  </p>
                  <p
                    className={`row-span-1 col-span-1 text-xl flex justify-end ${
                      item.available ? 'text-green-400' : ''
                    }`}
                  >
                    {item.available && <span>Available </span>}
                  </p>
                  <p
                    className="row-span-1 col-span-1 text-xl"
                    title={`Price/month`}
                  >
                    <span className="flex items-center gap-1">
                      <PriceIcon size={20} />
                      Rs.{item.price}
                    </span>
                  </p>
                  <p
                    title={`Posted By : ${item.postedBy}${
                      item.verified ? ' (Verified)' : ''
                    }`}
                    className={`row-span-1 col-span-1 text-xl flex justify-end ${
                      item.verified ? 'text-green-400' : ''
                    }`}
                  >
                    <span>
                      {item.postedBy}
                      {'  '}
                      {item.verified ? '✓' : ''}
                    </span>
                  </p>
                  <p
                    title={`Location`}
                    className={`row-span-1 col-span-2 text-xl flex justify-start `}
                  >
                    <span className="flex items-center gap-1">
                      <HomeLocationIcon size={20} /> {item.location}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
          <div
            ref={observerRef}
            className="h-1 border-2 border-transparent"
          ></div>
          {isFetchingNextPage && (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCardLayout;
