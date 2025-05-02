import { Metadata } from 'next';

import LoadMoreCityLocations from '@/app/components/Search/room/LoadMoreCityLocations';

export const metadata: Metadata = {
  title: 'Search Room',
};

export default async function Room() {
  return (
    <section className="">
      <LoadMoreCityLocations />
    </section>
  );
}
