export const dynamic = 'force-dynamic';

import {
  dehydrate,
  QueryClient,
  InfiniteData,
  HydrationBoundary,
} from '@tanstack/react-query';

import UpperLayout from './components/HomeLayouts/UpperLayout';
import LowerLayout from './components/HomeLayouts/LowerLayout';
import MiddleLayout from './components/HomeLayouts/MiddleLayout';
import { CategoryCitiesLocations, RoomData } from './types/types';
import ListNavigation from './components/HomeLayouts/ListNavigation';
import UpperSearchBox from './components/HomeLayouts/MiddleLayout/UpperSearchBox';
import LowerSearchBox from './components/HomeLayouts/MiddleLayout/LowerSearchBox';
import { getCategoryCitiesLocationDetails } from './lib/utils/CategoryPlacesServerAction';

const Home = async () => {
  const queryClient = new QueryClient();

  try {
    const {
      city,
      cityData,
      categoryDetails,
    }: {
      city: string;
      cityData: CategoryCitiesLocations;
      categoryDetails: RoomData[];
    } = await getCategoryCitiesLocationDetails({ category: 'room', offset: 0 });

    queryClient.setQueryData<string>(['city'], city);

    queryClient.setQueryData<CategoryCitiesLocations>(
      ['roomCitiesLocations'],
      cityData
    );

    queryClient.setQueryData<InfiniteData<RoomData[]>>([`room${city}`], {
      pageParams: [0],
      pages: [categoryDetails],
    });
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
          <LowerLayout city={city} cities={cityData} />
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
