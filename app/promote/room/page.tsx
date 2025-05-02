export const dynamic = 'force-dynamic';

import {
  dehydrate,
  QueryClient,
  InfiniteData,
  HydrationBoundary,
} from '@tanstack/react-query';

import { getServerSession } from 'next-auth';
import { ListedRoom } from '@/app/types/types';
import { ListersRooms, RoomListers } from '../types';
import { getPromotingDetails } from '../ServerAction';
import RoomLayout from '../../components/Promote/room/RoomLayout';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

const Room = async () => {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  try {
    const {
      listers,
      listerRooms,
    }: {
      listers: RoomListers[];
      listerRooms: ListedRoom[];
    } = await getPromotingDetails({
      offset: 0,
      userId: session?.user?.userId as string,
    });

    const listersRooms: ListersRooms = listerRooms.reduce(
      (acc: ListersRooms, room: ListedRoom) => {
        (acc[room.listerId] ||= []).push(room);
        return acc;
      },
      {}
    );

    queryClient.setQueryData<InfiniteData<RoomListers[]>>(['Listers'], {
      pageParams: [0],
      pages: [listers],
    });
    queryClient.setQueryData<ListersRooms>(['ListersRooms'], listersRooms);

    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
        <RoomLayout />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error('Failed to load promoting details:', error);

    return (
      <div className="text-red-500 p-4">
        Failed to load room data. Please try again later.
      </div>
    );
  }
};

export default Room;
