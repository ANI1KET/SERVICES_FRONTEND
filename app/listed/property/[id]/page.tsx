'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { ListedProperty } from '@/app/types/types';
import { fetchNewPropertyDetails } from '../../ServerAction';
import { decodeURLPlaceQuery } from '@/app/lib/utils/decodeURL';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import NewPropertyDetails from '@/app/components/ReUsable/NewPropertyDetails';
import ResponsivePropertyDetails from '@/app/components/ReUsable/ResponsivePropertyDetails';

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

const Property = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const propertyId = params?.id
    ? decodeURLPlaceQuery(params.id as string)
    : null;

  const dataFromCache = queryClient.getQueryData<ListedProperty>([
    'CategoryDetails',
    'property',
  ]);

  const {
    error,
    isLoading,
    data: newPropertyDetails,
  } = useQuery<ListedProperty>({
    queryKey: ['CategoryDetails', 'property'],
    queryFn: () =>
      propertyId
        ? fetchNewPropertyDetails(propertyId)
        : Promise.reject('No property ID'),
    enabled: !!propertyId && !dataFromCache,
    staleTime: 1000 * 60 * 10,
    initialData: dataFromCache,
  });

  if (!newPropertyDetails) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching property details.</div>;
  return (
    <div className="flex flex-col ">
      <div className="flex max-xsm:flex-col gap-1 p-2 relative mb-5 max-xsm:p-0 max-xsm:gap-0 ">
        <Suspense fallback={<div>Loading video...</div>}>
          <VideoPlayer videoUrl={newPropertyDetails?.video} />
        </Suspense>
        <NewPropertyDetails propertyCardDetails={newPropertyDetails} />
      </div>

      <ResponsivePropertyDetails propertyCardDetails={newPropertyDetails} />

      <div className="flex justify-center text-lg font-semibold p-1">
        Property Images
      </div>

      <ImageSlider imagesUrl={newPropertyDetails.photos as string[]} />
    </div>
  );
};

export default Property;
