'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

import { cn } from '@/app/lib/utils/tailwindMerge';
import SearchPanel from './LowerLayout/SearchPanel';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const PropertyCardLayout = dynamic(
  () => import('./LowerLayout/PropertyCardLayout'),
  { ssr: false }
);
const RoomCardLayout = dynamic(() => import('./LowerLayout/RoomCardLayout'), {
  ssr: false,
});

const LowerLayout: React.FC<{
  city: string;
  roomCitiesLocations: Record<string, string[]>;
  propertyCitiesLocations: Record<string, string[]>;
}> = ({ city, roomCitiesLocations, propertyCitiesLocations }) => {
  const cachedTheme = useThemeState();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);
  return (
    // <section className="max-sm:pt-[0] pt-[8vh] flex flex-row">
    <section className="max-sm:pt-[0] pt-[8vh] ">
      {/* <div className="w-[80vw] "> */}
      <div className="flex flex-col gap-6">
        {/* Rooms */}
        <RoomCardLayout
          city={city}
          route="room"
          title="Rooms"
          key={'RoomCities'}
          cities={roomCitiesLocations}
        />

        {/* Properties */}
        <PropertyCardLayout
          city={city}
          route="property"
          title="Properties"
          key={'PropertyCities'}
          cities={propertyCitiesLocations}
        />

        {/* Hostels */}
        {/* <CategoryCardLayout route="property" title="Properties" key={'PorpertyCities'} 
          city={CitiesLocations?.city as string}
          cities={CitiesLocations?.['property'] as { [key: string]: string[] }}
          /> */}

        {/* Vehicles */}
        {/* <CategoryCardLayout route="vehicle" title="Vehicles" key={'VehicleCities'} 
          city={CitiesLocations?.city as string}
          cities={CitiesLocations?.['vehicle'] as { [key: string]: string[] }}
          /> */}

        {/* Products */}
        {/* <CategoryCardLayout route="reMarketItem" title="Products" key={'RentalCities'} 
          city={CitiesLocations?.city as string}
          cities={CitiesLocations?.['reMarketItem'] as { [key: string]: string[] }}
        /> */}
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
