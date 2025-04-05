import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { MutableRefObject, Suspense } from 'react';

import { cn } from '../utils/tailwindMerge';
import { RoomData } from '@/app/types/types';
import { CapacityIcon, FurnishIcon, PriceIcon } from '../icon/svg';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const ImageLoop = dynamic(() => import('@/app/lib/ui/ImageLoop'), {
  ssr: false,
});
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
});

const RoomDetails = ({
  city,
  data,
  observerRef,
  isFetchingNextPage,
}: {
  city: string;
  isFetchingNextPage: boolean;
  data: RoomData[][] | undefined;
  observerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const router = useRouter();
  const cachedTheme = useThemeState();

  return (
    <div className="w-full flex overflow-x-auto ">
      <div className={cn('grid grid-rows-2 ')}>
        {data?.map((page, pageIndex) =>
          page.map((item, index: number) => (
            <div
              className={cn(
                `cursor-pointer `,
                index % 2 === 0 ? 'row-start-1' : 'row-start-2'
              )}
              key={`${pageIndex}${index}`}
              onClick={() => router.push(`/room/${btoa(`${item.id},${city}`)}`)}
            >
              {item.videos ? (
                <div
                  className={cn(
                    'xl:w-[25vw] aspect-video ',
                    'md:w-[33.3vw] ',
                    'max-sm:w-[50vw] ',
                    'max-xsm:w-screen '
                  )}
                >
                  <Suspense fallback={<Skeleton />}>
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
                  </Suspense>
                </div>
              ) : (
                <div
                  className={cn(
                    'xl:w-[25vw] relative aspect-video -z-10 ',
                    'md:w-[33.3vw] ',
                    'max-sm:w-[50vw] ',
                    'max-xsm:w-screen '
                  )}
                >
                  {item.photos && item.photos.length > 0 && (
                    <Suspense fallback={<Skeleton />}>
                      <ImageLoop images={item.photos} />
                    </Suspense>
                  )}
                </div>
              )}
              <div
                className={cn(
                  cachedTheme?.bg,
                  cachedTheme?.textColor,
                  cachedTheme?.borderColor,
                  'xl:w-[25vw] grid grid-rows-2 grid-cols-2 gap-1 p-1 border-r-[1px] border-l-[1px] border-b-[1px] rounded-b-md',
                  'md:w-[33.3vw] ',
                  'max-sm:w-[50vw] ',
                  'max-xsm:w-screen '
                )}
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
                  title={`${item.available ? 'Available' : 'Unavailable'}`}
                  className={`row-span-1 col-span-1 text-xl flex justify-end ${
                    item.available ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {item.available ? (
                    <span className="truncate">Available </span>
                  ) : (
                    <span className="truncate">Unavailable</span>
                  )}
                </p>
                <p
                  className="row-span-1 col-span-1 text-xl"
                  title={`Rs.${item.price}/month`}
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
                  className={`row-span-1 col-span-1 text-xl flex justify-end`}
                >
                  👤 {item.postedBy}
                </p>
                <p
                  title={`${item.roomtype}`}
                  className={`row-span-1 col-span-1 text-xl`}
                >
                  🏘️ {item.roomtype}
                </p>
                <p
                  title={`${item.furnishingStatus}`}
                  className={`row-span-1 col-span-1 text-xl flex justify-end items-center gap-1`}
                >
                  <FurnishIcon /> {item.furnishingStatus}
                </p>
                <p
                  title={`${item.location} (${item.direction})`}
                  className={`row-span-1 col-span-2 text-xl flex justify-start `}
                >
                  <span className="flex items-center gap-1 truncate ">
                    📌 {item.location}
                    {item.direction ? ` (${item.direction})` : ''}
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
            <div
              className={cn(
                cachedTheme?.activeBg,
                'w-8 h-8 border-4 border-t-transparent rounded-full animate-spin'
              )}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;

const Skeleton = () => (
  <div
    className={cn(
      'w-fulll aspect-video border animate-pulse bg-gray-300 border-black'
    )}
  ></div>
);
