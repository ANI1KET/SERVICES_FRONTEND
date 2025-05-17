import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { MutableRefObject, Suspense } from 'react';

import {
  PropertyArea,
  PropertyData,
  PropertyPlotWidth,
  PropertyHouseArea,
  PropertyPlotLength,
} from '@/app/types/types';
import {
  propertyArea,
  propertyPlotWidth,
  propertyHouseArea,
  propertyPlotLength,
} from '@/app/lib/scalableComponents';
import { PriceIcon } from '../../lib/icon/svg';
import { cn } from '../../lib/utils/tailwindMerge';
import { SelectCoversion } from './FormReusableComponent';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
});
const ImageLoop = dynamic(() => import('@/app/components/ReUsable/ImageLoop'), {
  ssr: false,
});

const PropertyDetails = ({
  city,
  data,
  observerRef,
  isFetchingNextPage,
}: {
  city: string;
  isFetchingNextPage: boolean;
  data: PropertyData[][] | undefined;
  observerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const router = useRouter();
  const cachedTheme = useThemeState();

  return (
    <div className="w-full flex overflow-x-auto ">
      <div className={cn('grid grid-rows-2 ')}>
        {data?.map((page, pageIndex) =>
          page.map((propertyData, index: number) => (
            <div
              key={`${pageIndex}${index}`}
              className={cn(
                'cursor-pointer ',
                index % 2 === 0 ? 'row-start-1' : 'row-start-2'
              )}
              onClick={() =>
                router.push(`/property/${btoa(`${propertyData.id},${city}`)}`)
              }
            >
              {propertyData.video ? (
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
                      url={propertyData.video}
                      style={{ pointerEvents: 'none' }}
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
                  {propertyData.photos && propertyData.photos.length > 0 && (
                    <Suspense fallback={<Skeleton />}>
                      <ImageLoop images={propertyData.photos} />
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
                  className="row-span-1 col-span-1 text-xl"
                  title={`Rs.${propertyData.price}/month`}
                >
                  <span className="flex items-center gap-1">
                    <PriceIcon size={20} />
                    Rs.{propertyData.price}
                  </span>
                </p>
                <p
                  title={`${propertyData.available ? 'Available' : 'Sold'}`}
                  className={`row-span-1 col-span-1 text-xl flex justify-end ${
                    propertyData.available ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {propertyData.available ? (
                    <span className="truncate">Available </span>
                  ) : (
                    <span className="truncate">Sold</span>
                  )}
                </p>

                <div
                  className={`flex items-center row-span-1 col-span-1 text-xl`}
                >
                  🏞️
                  <SelectCoversion<PropertyArea>
                    label="area"
                    maxWidth="70px"
                    options={propertyArea}
                    value={propertyData.area}
                  />
                </div>
                <p
                  title={`${propertyData.propertyType}`}
                  className={`row-span-1 col-span-1 text-xl flex justify-end`}
                >
                  <span className="truncate"> {propertyData.propertyType}</span>
                </p>

                {propertyData.propertyType === 'House' && (
                  <>
                    <div
                      className={`flex items-center row-span-1 col-span-1 text-xl`}
                    >
                      🏠
                      <SelectCoversion<PropertyHouseArea>
                        maxWidth="70px"
                        label="builtUpArea"
                        options={propertyHouseArea}
                        value={propertyData.builtUpArea}
                      />
                    </div>

                    <p
                      title={`${propertyData.floors}`}
                      className={`row-span-1 col-span-1 text-xl flex justify-end`}
                    >
                      <span className="truncate">🏢 {propertyData.floors}</span>
                    </p>
                  </>
                )}

                {propertyData.propertyType === 'Land' && (
                  <>
                    <div
                      className={`flex items-center row-span-1 col-span-1 text-xl`}
                    >
                      🏠
                      <SelectCoversion<PropertyPlotWidth>
                        maxWidth="70px"
                        label="plotWidth"
                        options={propertyPlotWidth}
                        value={propertyData.plotWidth}
                      />
                    </div>

                    <div
                      className={`flex items-center justify-end row-span-1 col-span-1 text-xl`}
                    >
                      🏠
                      <SelectCoversion<PropertyPlotLength>
                        maxWidth="70px"
                        label="plotLength"
                        options={propertyPlotLength}
                        value={propertyData.plotLength}
                      />
                    </div>
                  </>
                )}

                <p
                  title={`${propertyData.location}`}
                  className={`row-span-1 col-span-2 text-xl flex justify-start `}
                >
                  <span className="flex items-center gap-1 truncate ">
                    📌 {propertyData.location}
                    {propertyData.direction
                      ? ` (${propertyData.direction})`
                      : ''}
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

export default PropertyDetails;

const Skeleton = () => (
  <div
    className={cn(
      'w-full aspect-video border animate-pulse bg-gray-300 border-black'
    )}
  ></div>
);
