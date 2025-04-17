'use server';

import {
  dehydrate,
  QueryClient,
  InfiniteData,
  HydrationBoundary,
} from '@tanstack/react-query';

import {
  GroupedRooms,
  NewListedRoom,
  UserFromRoomData,
} from '@/app/types/types';
import { getPromotingDetails } from '../ServerAction';
import RoomLayout from '../component/room/RoomLayout';

const Room = async () => {
  const queryClient = new QueryClient();

  try {
    const {
      listers,
      listerRooms,
    }: { listers: UserFromRoomData[]; listerRooms: NewListedRoom[] } =
      await getPromotingDetails({ offset: 0 });

    const listersRooms: GroupedRooms = listerRooms.reduce(
      (acc: GroupedRooms, room: NewListedRoom) => {
        (acc[room.listerId] ||= []).push(room);
        return acc;
      },
      {}
    );

    queryClient.setQueryData<InfiniteData<UserFromRoomData[]>>(['Listers'], {
      pageParams: [0],
      pages: [listers],
    });
    queryClient.setQueryData<GroupedRooms>(['ListersRooms'], listersRooms);

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
