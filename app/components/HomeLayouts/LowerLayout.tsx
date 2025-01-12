'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { CityData } from '@/app/providers/reactqueryProvider';
import CategoryCardLayout from './LowerLayout/CategoryCardLayout';

const LowerLayout = () => {
  const queryClient = useQueryClient();
  const [cachedData, setCachedData] = useState<CityData | undefined>();

  useEffect(() => {
    const handleCacheUpdate = (event: { query?: { queryKey?: unknown[] } }) => {
      const updatedData = queryClient.getQueryData<CityData>([
        'getCategoryCitiesLocations',
      ]);

      if (event.query?.queryKey?.[0] === 'getCategoryCitiesLocations') {
        setCachedData(updatedData);
      }
    };

    const unsubscribe = queryClient
      .getQueryCache()
      .subscribe(handleCacheUpdate);

    return () => {
      unsubscribe();
    };
  }, [queryClient]);
  return (
    // <section className="max-sm:pt-[0] pt-[8vh] flex flex-row">
    <section className="max-sm:pt-[0] pt-[8vh] ">
      {/* <div className="w-[80vw] "> */}
      <div className=" ">
        {/* Rooms */}
        {(cachedData?.['room'] as { [key: string]: string[] }) && (
          <CategoryCardLayout
            title="room"
            key={'RoomCities'}
            city={cachedData?.city as string}
            cities={cachedData?.['room'] as { [key: string]: string[] }}
          />
        )}

        {/* Stores */}
        {(cachedData?.['store'] as { [key: string]: string[] }) && (
          <CategoryCardLayout
            title="store"
            key={'StoreCities'}
            city={cachedData?.city as string}
            cities={cachedData?.['store'] as { [key: string]: string[] }}
          />
        )}

        {/* Hostel */}
        {(cachedData?.['hostel'] as { [key: string]: string[] }) && (
          <CategoryCardLayout
            title="hostel"
            key={'HostelCities'}
            city={cachedData?.city as string}
            cities={cachedData?.['hostel'] as { [key: string]: string[] }}
          />
        )}

        {/* Restaurant */}
        {(cachedData?.['restaurant'] as { [key: string]: string[] }) && (
          <CategoryCardLayout
            title="restaurant"
            key={'RestaurantCities'}
            city={cachedData?.city as string}
            cities={cachedData?.['restaurant'] as { [key: string]: string[] }}
          />
        )}

        {/* Land */}
        {(cachedData?.['land'] as { [key: string]: string[] }) && (
          <CategoryCardLayout
            title="land"
            key={'LandCities'}
            city={cachedData?.city as string}
            cities={cachedData?.['land'] as { [key: string]: string[] }}
          />
        )}

        {/* Repair */}
        {(cachedData?.['repair'] as { [key: string]: string[] }) && (
          <CategoryCardLayout
            title="repair"
            key={'RepairCities'}
            city={cachedData?.city as string}
            cities={cachedData?.['repair'] as { [key: string]: string[] }}
          />
        )}

        {/* Rental */}
        {(cachedData?.['rental'] as { [key: string]: string[] }) && (
          <CategoryCardLayout
            title="rental"
            key={'RentalCities'}
            city={cachedData?.city as string}
            cities={cachedData?.['rental'] as { [key: string]: string[] }}
          />
        )}
      </div>

      {/* <div className="w-[20vw] ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo itaque
        dignissimos nobis corporis incidunt placeat expedita amet deserunt?
        Distinctio dolor, fugit, repudiandae iste libero, illo repellendus quia
        sit id explicabo voluptatem. Eveniet, tempore quibusdam quaerat quam
        sint placeat necessitatibus dicta in harum hic dolorem quia sunt ratione
        doloribus reprehenderit vitae dolorum voluptatum, quis rem?
        Reprehenderit minus reiciendis nostrum eius amet id ipsum autem
        consequuntur repellendus molestias consectetur doloremque, sed soluta
        corporis omnis enim placeat eaque qui distinctio delectus incidunt
        adipisci in provident! Maiores inventore veritatis incidunt deleniti
        sunt corrupti nesciunt odio placeat mollitia consectetur veniam
        quibusdam dicta molestiae cumque at iusto voluptate, iste asperiores
        ipsam id doloribus! Soluta mollitia quod ipsam, fugiat dolor enim odio
        suscipit nemo. Nihil, omnis?
      </div> */}
    </section>
  );
};

export default LowerLayout;
