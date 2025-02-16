'use client';

import { Room } from '@prisma/client';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

import { LIMIT } from '../../variables';
import { GET_LISTED_ROOMS } from '../../graphQL/userQuery';
import MainLayout from '../../components/broker/room/MainLayout';
import SearchLayout from '../../components/broker/room/SearchLayout';

const OwnerRoomDashboard = () => {
  const session = useSession();

  const { data, loading, error, fetchMore } = useQuery<{
    user: { rooms: Room[] };
  }>(GET_LISTED_ROOMS, {
    // fetchPolicy: 'cache-and-network',
    variables: { id: session.data?.user.userId, offset: 0, limit: LIMIT },
  });
  return (
    <div className="w-full overflow-x-hidden overflow-y-scroll">
      <SearchLayout>
        <MainLayout
          data={data}
          error={error}
          loading={loading}
          fetchMore={fetchMore}
        />
      </SearchLayout>
    </div>
  );
};

export default OwnerRoomDashboard;
