import { Metadata } from 'next';

import LoadMoreCityLocations from '@/app/components/Search/property/LoadMoreCityLocations';

export const metadata: Metadata = {
  title: 'Search Room',
};

const Property = () => {
  return (
    <section className="">
      <LoadMoreCityLocations />
    </section>
  );
};

export default Property;
