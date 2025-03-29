import Link from 'next/link';
// import Image from 'next/image';
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';

import ImageLoop from '../../../lib/ui/ImageLoop';
import { NewListedRoom } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import RoomDetailsLayout from './/RoomDetailsLayout';
import AutoScrollCarousel from './AutoScrollCarousel';
import { useThemeState } from '@/app/providers/reactqueryProvider';

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
        const memoizedPhotos = roomDetails.photos;

        return (
          <Link key={roomDetails.id} href={`/${category}/${encodedId}`}>
            <div className="w-full grid grid-cols-9 mb-5">
              {/* {roomDetails.videos ? (
                <div className="col-span-3 max-sm:col-span-4 max-xsm:col-span-9 aspect-video">
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
                  <AutoScrollCarousel photos={memoizedPhotos} />
                </div>
              ) : (
                <div className="col-span-3 max-sm:col-span-4 max-xsm:col-span-9">
                  <div className="relative aspect-square max-xsm:aspect-video">
                    <ImageLoop images={memoizedPhotos} />
                  </div>
                </div>
              )} */}
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
