import Link from 'next/link';
// import Image from 'next/image';
import dynamic from 'next/dynamic';
import { memo, Suspense, useMemo } from 'react';

import { ListedProperty } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import PropertyDetailsLayout from './PropertyDetailsLayout';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const ImageLoop = dynamic(() => import('../../../lib/ui/ImageLoop'), {
  ssr: false,
});
const AutoScrollCarousel = dynamic(
  () => import('../ReUsable/AutoScrollCarousel'),
  {
    ssr: false,
  }
);
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface CityLocationsDataProps {
  category: string;
  cityLocationsData: ListedProperty[];
}

const CityLocationsData = memo(
  ({ category, cityLocationsData }: CityLocationsDataProps) => {
    const cachedTheme = useThemeState();

    const roomElements = useMemo(() => {
      return cityLocationsData.map((propertyDetails) => {
        const encodedId = btoa(propertyDetails.id);
        // const encodedId = btoa(`${propertyDetails.id},${propertyDetails.city}`);
        const memoizedPhotos = propertyDetails.photos;

        return (
          <div
            key={propertyDetails.id}
            className="w-full grid grid-cols-9 mb-5"
          >
            {propertyDetails.video ? (
              <div className="col-span-3 max-sm:col-span-4 max-xsm:col-span-9 aspect-video">
                <Link href={`/${category}/${encodedId}`}>
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
                      url={propertyDetails.video}
                      style={{ pointerEvents: 'none' }}
                    />
                  </Suspense>
                  <AutoScrollCarousel photos={memoizedPhotos} />
                </Link>
              </div>
            ) : (
              <div className="col-span-3 max-sm:col-span-4 max-xsm:col-span-9">
                <Link href={`/${category}/${encodedId}`}>
                  <div className="relative aspect-square max-xsm:aspect-video">
                    <Suspense fallback={<ImageSkeleton />}>
                      <ImageLoop images={memoizedPhotos} />
                    </Suspense>
                  </div>
                </Link>
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
              <PropertyDetailsLayout propertyCardDetails={propertyDetails} />
            </div>
          </div>
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
