import Link from 'next/link';
// import Image from 'next/image';
import dynamic from 'next/dynamic';
import { memo, Suspense, useMemo } from 'react';

import { NewListedRoom } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import RoomDetailsLayout from './/RoomDetailsLayout';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const ImageLoop = dynamic(() => import('../../../lib/ui/ImageLoop'), {
  ssr: false,
  loading: () => <ImageSkeleton />,
});
const AutoScrollCarousel = dynamic(() => import('./AutoScrollCarousel'), {
  ssr: false,
});
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface CityLocationsDataProps {
  category: string;
  cityLocationsData: NewListedRoom[];
}

const CityLocationsData = memo(
  ({ category, cityLocationsData }: CityLocationsDataProps) => {
    const cachedTheme = useThemeState();

    const roomElements = useMemo(() => {
      return cityLocationsData.map((roomDetails) => {
        const encodedId = btoa(roomDetails.id);
        // const encodedId = btoa(`${roomDetails.id},${roomDetails.city}`);
        const memoizedPhotos = roomDetails.photos;

        return (
          <Link key={roomDetails.id} href={`/${category}/${encodedId}`}>
            <div className="w-full grid grid-cols-9 mb-5">
              {roomDetails.videos ? (
                <div className="col-span-3 max-sm:col-span-4 max-xsm:col-span-9 aspect-video">
                  <Suspense fallback={<VideoSkeleton />}>
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
                      style={{ pointerEvents: 'none' }}
                      url={roomDetails.videos}
                    />
                  </Suspense>
                  <AutoScrollCarousel photos={memoizedPhotos} />
                </div>
              ) : (
                <div className="col-span-3 max-sm:col-span-4 max-xsm:col-span-9">
                  <div className="relative aspect-square max-xsm:aspect-video">
                    <Suspense fallback={<ImageSkeleton />}>
                      <ImageLoop images={memoizedPhotos} />
                    </Suspense>
                  </div>
                </div>
              )}
              <div
                className={cn(
                  cachedTheme?.bg,
                  cachedTheme?.textColor,
                  cachedTheme?.borderColor,
                  'col-span-6 max-sm:col-span-5 max-xsm:col-span-9 p-1 border-2 rounded-r-xl max-xsm:rounded-tr-none max-xsm:rounded-b-xl'
                )}
              >
                <RoomDetailsLayout roomCardDetails={roomDetails} />
              </div>
            </div>
          </Link>
        );
      });
    }, [cityLocationsData, category, cachedTheme]);

    return <>{roomElements}</>;
  }
);

CityLocationsData.displayName = 'CityLocationsData';
export default CityLocationsData;

const VideoSkeleton = () => (
  <div
    className={cn(
      'w-fulll aspect-video border animate-pulse bg-gray-300 border-black'
    )}
  ></div>
);
const ImageSkeleton = () => (
  <div
    className={cn(
      'relative aspect-square max-xsm:aspect-video border-y border-l animate-pulse bg-gray-300 border-black'
    )}
  ></div>
);
