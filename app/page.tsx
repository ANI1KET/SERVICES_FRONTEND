'use server';

import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';

import UpperLayout from './components/HomeLayouts/UpperLayout';
import LowerLayout from './components/HomeLayouts/LowerLayout';
import MiddleLayout from './components/HomeLayouts/MiddleLayout';
import ListNavigation from './components/HomeLayouts/ListNavigation';
import UpperSearchBox from './components/HomeLayouts/MiddleLayout/UpperSearchBox';
import LowerSearchBox from './components/HomeLayouts/MiddleLayout/LowerSearchBox';
import { getCategoryCitiesLocations } from './lib/utils/CategoryPlacesServerAction';
import { getCategoryDetails } from './components/HomeLayouts/LowerLayout/ServerAction';

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['getCategoryCitiesLocations'],
    queryFn: async () => await getCategoryCitiesLocations('room'),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['roomKathmandu'],
    queryFn: async () =>
      await getCategoryDetails({
        offset: 0,
        category: 'room',
        city: 'Kathmandu',
      }),
    initialPageParam: 0,
  });
  // const data = queryClient.getQueryData(['getCategoryCitiesLocations']);
  // const infiniteData = queryClient.getQueryData(['roomKathmandu']);
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
        <LowerLayout />
      </HydrationBoundary>
    </main>
  );
};

export default Home;
