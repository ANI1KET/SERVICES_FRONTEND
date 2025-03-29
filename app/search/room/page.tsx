import { Metadata } from 'next';

import LoadMoreCityLocations from './component/LoadMoreCityLocations';

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
