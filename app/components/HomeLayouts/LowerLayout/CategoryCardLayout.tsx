'use client';

import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import ImageLoop from './ImageLoop';
import { getCategoryDetails } from './ServerAction';

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

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
    <div className="w-full h-[45vh] max-xsm:h-[52vh]">
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
      <div className="h-[30vh] max-xsm:h-fit w-full flex overflow-x-auto">
        <div className="flex">
          {data?.pages.map((page, pageIndex) =>
            page.map((item, index: number) => (
              <div
                key={`${pageIndex}${index}`}
                // className="w-[33.3vw] max-sm:w-[50vw] max-xsm:w-screen relative aspect-video"
                className="max-xsm:w-screen relative aspect-video cursor-pointer"
                onClick={() => router.push(`/room/${btoa(item.id)}`)}
              >
                {item.videos ? (
                  <ReactPlayer
                    loop
                    muted
                    playing
                    width="100%"
                    height="100%"
                    controls={false}
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
                    url={item.videos}
                  />
                ) : (
                  <div className="relative w-full h-full overflow-hidden">
                    {item.photos && item.photos.length > 0 && (
                      <ImageLoop images={item.photos} />
                    )}
                  </div>
                )}
                <div className="absolute top-0 w-full h-full z-10 pointer-events-auto">
                  <div className="grid grid-rows-2 grid-cols-2 h-full p-1">
                    <p className="row-span-1 col-span-1 text-xl "></p>
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
                      className={`row-span-1 col-span-1 text-xl flex flex-col justify-end`}
                      title={`Price : ${item.price}/month\nMinimum Person : ${item.mincapacity}\nMaximum Person : ${item.maxcapacity}`}
                    >
                      <span>
                        {item.mincapacity}-{item.maxcapacity}
                      </span>
                      <span>Rs.{item.price}</span>
                    </p>
                    <p
                      title={`UpdatedAt : ${new Date(
                        item.updatedAt
                      ).toDateString()}`}
                      className={`row-span-1 col-span-1 text-xl flex flex-col justify-end items-end ${
                        item.available ? 'text-green-400' : ''
                      }`}
                    >
                      {item.available && <span>Available </span>}
                      <span>{new Date(item.updatedAt).toDateString()}</span>
                    </p>
                  </div>
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
