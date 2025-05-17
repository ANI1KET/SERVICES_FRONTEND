'use client';

import {
  useQuery,
  InfiniteData,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Suspense, useCallback, useEffect, useRef } from 'react';

import {
  useThemeState,
  useGetPropertySearchData,
} from '@/app/providers/reactqueryProvider';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { PAGE_SIZE } from '../../../lib/reusableConst';
import PropertyDetails from '../../ReUsable/PropertyDetails';
import { ListedProperty, PropertyData } from '@/app/types/types';
import NewPropertyDetails from '../../ReUsable/NewPropertyDetails';
import { fetchSelectedPropertyDetails } from '@/app/(selected)/ServerAction';
import ResponsivePropertyDetails from '../../ReUsable/ResponsivePropertyDetails';
import { getCategoryDetails } from '@/app/components/HomeLayouts/LowerLayout/ServerAction';

const VideoPlayer = dynamic(
  () => import('@/app/components/ReUsable/VideoPlayer'),
  {
    ssr: false,
  }
);
const ImageSlider = dynamic(
  () => import('@/app/components/ReUsable/ImageSlider'),
  {
    ssr: false,
  }
);

const findMatchingProperty = (
  propertyId: string,
  cachedData: { pages: PropertyData[][] } | undefined
): PropertyData | undefined => {
  if (!cachedData?.pages) return undefined;

  for (const page of cachedData.pages) {
    const matchingProperty = page.find(
      (property) => property.id === propertyId
    );
    if (matchingProperty) return matchingProperty;
  }

  return undefined;
};

const PropertyDetailsLayout: React.FC<{
  city?: string;
  propertyId: string;
}> = ({ city, propertyId }) => {
  const cacheTheme = useThemeState();
  const queryClient = useQueryClient();
  const searchData = useGetPropertySearchData();

  const cachedData = city
    ? queryClient.getQueryData<InfiniteData<PropertyData[]>>([
        `property${city}`,
      ])
    : (() => {
        if (!searchData) return undefined;
        return queryClient.getQueryData<InfiniteData<PropertyData[]>>([
          'search/property',
          searchData,
        ]);
      })();

  const propertyDetails = findMatchingProperty(propertyId, cachedData);

  const { data: fallbackPropertyDetails, isFetching } =
    useQuery<ListedProperty>({
      queryKey: ['selectedProperty', propertyId],
      queryFn: () => fetchSelectedPropertyDetails(propertyId),
      enabled: !propertyDetails,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  const finalPropertyDetails = propertyDetails || fallbackPropertyDetails;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`property${finalPropertyDetails?.city}`],
      queryFn: ({ pageParam = 0 }) =>
        getCategoryDetails({
          category: 'property',
          offset: pageParam,
          city: finalPropertyDetails?.city as string,
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
      enabled: !!finalPropertyDetails?.city,
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

  if (isFetching)
    return (
      <div className="w-full flex justify-center items-center">
        <div
          className={cn(
            cacheTheme?.activeBg,
            'w-8 h-8 border-4 border-t-transparent rounded-full animate-spin'
          )}
        ></div>
      </div>
    );
  if (!finalPropertyDetails)
    return (
      <div className="w-full flex justify-center items-center">
        Property Not Found
      </div>
    );
  return (
    <div className="flex flex-col ">
      <div className="flex max-xsm:flex-col gap-1 p-2 relative max-xsm:p-0 max-xsm:gap-0 ">
        <Suspense fallback={<VideoSkeleton />}>
          <VideoPlayer videoUrl={finalPropertyDetails.video} />
        </Suspense>
        <NewPropertyDetails
          propertyCardDetails={finalPropertyDetails as ListedProperty}
        />
      </div>
      <ResponsivePropertyDetails
        propertyCardDetails={finalPropertyDetails as ListedProperty}
      />

      <div
        className={cn(
          cacheTheme?.textColor,
          'flex justify-center text-lg font-semibold p-1'
        )}
      >
        Property Images
      </div>

      <ImageSlider imagesUrl={finalPropertyDetails.photos as string[]} />

      <div className={'mt-5 '}>
        <p
          className={cn(
            cacheTheme.borderColor,
            'text-xl text-center font-semibold p-1 border rounded-t-xl'
          )}
        >
          Similar Properties in {finalPropertyDetails.city}
        </p>

        <PropertyDetails
          observerRef={observerRef}
          city={finalPropertyDetails.city as string}
          isFetchingNextPage={isFetchingNextPage}
          data={data?.pages as PropertyData[][] | undefined}
        />
      </div>
    </div>
  );
};

export default PropertyDetailsLayout;

const VideoSkeleton = () => (
  <div
    className={cn(
      'relative w-[45vw] max-xsm:w-screen aspect-video border animate-pulse bg-gray-600 border-black'
    )}
  ></div>
);
