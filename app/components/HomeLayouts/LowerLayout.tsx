'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { cn } from '@/app/lib/utils/tailwindMerge';
import CategoryCardLayout from './LowerLayout/CategoryCardLayout';
import SearchPanel from '../BottomNavigationBar/PanelComponent/SearchPanel';
import { CityData, useThemeState } from '@/app/providers/reactqueryProvider';

const LowerLayout = () => {
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [cachedData, setCachedData] = useState<CityData | undefined>();

  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleCacheUpdate = (event: { query?: { queryKey?: unknown[] } }) => {
      if (event.query?.queryKey?.[0] === 'getCategoryCitiesLocations') {
        const updatedData = queryClient.getQueryData<CityData>([
          'getCategoryCitiesLocations',
        ]);

        if (updatedData) {
          setCachedData(updatedData);
        }
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

      <div
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          `fixed bottom-[7.8vh] left-0 right-0 flex flex-col items-center rounded-t-3xl transition-transform duration-300 ${
            !isPanelOpen && 'hidden'
          }`
        )}
      >
        <div
          className={cn(
            cachedTheme?.borderColor,
            'h-[75vh] rounded-t-3xl w-full p-2 overflow-y-scroll border-2 border-b-0'
          )}
        >
          <SearchPanel />
        </div>
        <div
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.borderColor,
            'cursor-pointer rounded-full p-1 backdrop-blur-3xl border-2 absolute bottom-[0.8vh] right-1'
          )}
          onClick={togglePanel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={34}
            height={34}
            viewBox="0 0 24 24"
            fill="none"
            stroke={cn(cachedTheme?.svgIconColor)}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-x`}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      </div>

      {!isPanelOpen && (
        <div
          className={cn(
            cachedTheme?.bg,
            cachedTheme?.borderColor,
            'hidden max-sm:block fixed bottom-[8.5vh] right-1 cursor-pointer rounded-full p-1 border-2'
          )}
          onClick={togglePanel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={34}
            height={34}
            viewBox="0 0 24 24"
            fill="none"
            stroke={cn(cachedTheme?.svgIconColor)}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-search `}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      )}

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
