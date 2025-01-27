import Link from 'next/link';
// import Image from 'next/image';
import ReactPlayer from 'react-player';

import ImageLoop from '../../../lib/ui/ImageLoop';
import { NewListedRoom } from '@/app/types/types';
import AutoScrollCarousel from './AutoScrollCarousel';
import RoomDetailsLayout from './/RoomDetailsLayout';

const CityLocationsData = ({
  category,
  cityLocationsData,
}: {
  category: string;
  cityLocationsData: NewListedRoom[];
}) => {
  return (
    <>
      {cityLocationsData &&
        cityLocationsData.map((roomDetails) => (
          <Link
            key={roomDetails.id}
            href={`/${category}/${btoa(roomDetails.id)}`}
          >
            <div className="w-full grid grid-cols-6 mb-5 ">
              {roomDetails.videos ? (
                <div className="col-span-3 max-xsm:col-span-6 aspect-video ">
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
                <div className="col-span-3 max-xsm:col-span-6">
                  <div className="relative aspect-square max-xsm:aspect-video">
                    <ImageLoop images={roomDetails.photos} />
                  </div>
                </div>
              )}
              <div className="col-span-3 max-xsm:col-span-6 p-1 border-2 border-black rounded-r-xl max-xsm:rounded-tr-none max-xsm:rounded-b-xl">
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
