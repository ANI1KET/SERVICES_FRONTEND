export const dynamic = 'force-dynamic';
// export const revalidate = 300;

import {
  dehydrate,
  QueryClient,
  InfiniteData,
  HydrationBoundary,
} from '@tanstack/react-query';

import UpperLayout from './components/HomeLayouts/UpperLayout';
import LowerLayout from './components/HomeLayouts/LowerLayout';
import MiddleLayout from './components/HomeLayouts/MiddleLayout';
import ListNavigation from './components/HomeLayouts/ListNavigation';
import { getCategoryCitiesLocationDetails } from './components/ServerAction';
import { CategoryCitiesLocations, PropertyData, RoomData } from './types/types';
import UpperSearchBox from './components/HomeLayouts/MiddleLayout/UpperSearchBox';
import LowerSearchBox from './components/HomeLayouts/MiddleLayout/LowerSearchBox';

const Home = async () => {
  const queryClient = new QueryClient();

  try {
    const {
      city,
      roomCityDetails,
      roomCitiesLocations,
      propertyCityDetails,
      propertyCitiesLocations,
    }: {
      city: string;
      roomCityDetails: RoomData[];
      propertyCityDetails: PropertyData[];
      roomCitiesLocations: CategoryCitiesLocations;
      propertyCitiesLocations: CategoryCitiesLocations;
    } = await getCategoryCitiesLocationDetails();

    queryClient.setQueryData<string>(['city'], city);

    queryClient.setQueryData<CategoryCitiesLocations>(
      ['roomCitiesLocations'],
      roomCitiesLocations
    );

    queryClient.setQueryData<InfiniteData<RoomData[]>>([`room${city}`], {
      pageParams: [0],
      pages: [roomCityDetails],
    });

    queryClient.setQueryData<InfiniteData<PropertyData[]>>(
      [`property${city}`],
      {
        pageParams: [0],
        pages: [propertyCityDetails],
      }
    );
    return (
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ListNavigation />
          <UpperLayout />
          <MiddleLayout>
            <UpperSearchBox />
            <LowerSearchBox />
          </MiddleLayout>
          {/* <MiddleLayout
        upperComponent={<UpperSearchBox />}
        lowerComponent={<LowerSearchBox />}
        /> */}
          <LowerLayout
            city={city}
            roomCitiesLocations={roomCitiesLocations}
            propertyCitiesLocations={propertyCitiesLocations}
          />
        </HydrationBoundary>
      </main>
    );
  } catch (error) {
    console.error('Failed to load details:', error);

    return (
      <div className="w-full text-red-500 p-4 text-center">
        Failed to load data. Please try again later.
      </div>
    );
  }
};

export default Home;
