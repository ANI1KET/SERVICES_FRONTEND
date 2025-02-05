import Link from 'next/link';
// import Image from 'next/image';
import ReactPlayer from 'react-player';

import ImageLoop from '../../../lib/ui/ImageLoop';
import { NewListedRoom } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import RoomDetailsLayout from './/RoomDetailsLayout';
import AutoScrollCarousel from './AutoScrollCarousel';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const CityLocationsData = ({
  category,
  cityLocationsData,
}: {
  category: string;
  cityLocationsData: NewListedRoom[];
}) => {
  const cachedTheme = useThemeState();

  return (
    <>
      {cityLocationsData &&
        cityLocationsData.map((roomDetails) => (
          <Link
            key={roomDetails.id}
            href={`/${category}/${btoa(roomDetails.id)}`}
          >
            <div className="w-full grid grid-cols-9 mb-5 ">
              {roomDetails.videos ? (
                <div className="col-span-3 max-sm:col-span-4 max-xsm:col-span-9 aspect-video ">
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
                    url={roomDetails.videos as string}
                  />
                  <AutoScrollCarousel photos={roomDetails.photos} />
                  {/* <div className="flex overflow-x-scroll">
                    {roomDetails.photos.map((image, index) => (
                      // <div
                      //   key={index}
                      //   className="relative min-w-[25%] max-sm:min-w-[33.33%] aspect-square"
                      // >
                      //   <Image
                      //     fill
                      //     loading="lazy"
                      //     src={image}
                      //     alt={`Slide ${index}`}
                      //     style={{
                      //       objectFit: 'fill',
                      //       objectPosition: 'center',
                      //     }}
                      //     sizes="100%"
                      //   />
                      // </div>
                    ))}
                  </div> */}
                </div>
              ) : (
                <div className="col-span-3 max-sm:col-span-4 max-xsm:col-span-9">
                  <div className="relative aspect-square max-xsm:aspect-video">
                    <ImageLoop images={roomDetails.photos} />
                  </div>
                </div>
              )}
              <div
                className={cn(
                  cachedTheme?.bg,
                  cachedTheme?.textColor,
                  cachedTheme?.borderColor,
                  'col-span-6 max-sm:col-span-5 max-xsm:col-span-9 p-1 border-2 rounded-r-xl max-xsm:rounded-tr-none max-xsm:rounded-b-xl '
                )}
              >
                <RoomDetailsLayout
                  roomCardDetails={roomDetails as NewListedRoom}
                />
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default CityLocationsData;
