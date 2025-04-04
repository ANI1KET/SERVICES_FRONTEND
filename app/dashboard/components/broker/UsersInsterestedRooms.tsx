import React from 'react';
import { useSession } from 'next-auth/react';
import { Reference, StoreObject, useMutation, useQuery } from '@apollo/client';

import {
  GET_INTERESTED_ROOMS,
  DELETE_INTERESTED_USER,
} from '../../graphQL/interestedRooms';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { InterestedBy, RoomData } from '../../types';
import { timeAgoDetailed } from '@/app/lib/utils/timeCalculation';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const UsersInsterestedRooms: React.FC = React.memo(() => {
  const session = useSession();
  const cachedTheme = useThemeState();

  const { data } = useQuery<{
    interestedRooms: RoomData[];
  }>(GET_INTERESTED_ROOMS, {
    variables: { listerId: session.data?.user.userId },
  });
  return (
    <section
      className={cn(
        cachedTheme?.textColor,
        'grid gap-y-2 p-1 h-[36vh] overflow-y-scroll',
        'grid-cols-3 ',
        'max-sm:grid-cols-2  max-sm:text-sm max-sm:h-[32vh]',
        'max-xsm:grid-cols-1 max-xsm:h-full max-xsm:gap-y-0 '
      )}
    >
      {data &&
        data.interestedRooms.map((roomData, index) => (
          <React.Fragment key={index}>
            <RoomCard roomData={roomData} />

            <div className="col-span-2 max-sm:col-span-1 flex items-center overflow-x-auto whitespace-nowrap max-xsm:py-2 max-xsm:mb-2">
              {roomData.interestedBy.map((interest, j) => (
                <UserCard key={j} interest={interest} id={roomData.id} />
              ))}
            </div>
          </React.Fragment>
        ))}
    </section>
  );
});
UsersInsterestedRooms.displayName = 'UsersInsterestedRooms';
export default UsersInsterestedRooms;

const RoomCard = React.memo(({ roomData }: { roomData: RoomData }) => {
  const cachedTheme = useThemeState();

  return (
    <div
      className={cn(
        cachedTheme?.bg,
        cachedTheme?.borderColor,
        `col-span-1 border rounded-lg transition-transform duration-200 hover:ring-1 ${cachedTheme?.activeRingColor}`
      )}
    >
      <h3 className={cn(cachedTheme?.borderColor, 'border-b p-1')}>
        🆔{roomData.roomId}
      </h3>
      <h3 className={cn(cachedTheme?.borderColor, 'border-b p-1')}>
        🌍{roomData.room.location} ({roomData.room.city})
      </h3>

      <p className={cn(cachedTheme?.borderColor, 'border-b p-1')}>
        📌 {roomData.room.direction ?? 'Not Available'}
      </p>

      <p
        className={cn(
          cachedTheme?.borderColor,
          'w-full flex justify-around border-b p-1'
        )}
      >
        <span className={cn(cachedTheme?.borderColor, 'w-1/2 border-r')}>
          Rs.{roomData.room.price}
        </span>
        <span className="w-1/2">
          {roomData.room.available ? '✅ Available' : '❌ Not Available'}
        </span>
      </p>

      <p
        className={cn(
          cachedTheme?.borderColor,
          'w-full flex justify-around border-b p-1'
        )}
      >
        <span className={cn(cachedTheme?.borderColor, 'w-1/2 border-r ')}>
          👤 {roomData.room.ownerContact}
        </span>
        <span className="w-1/2">📞 {roomData.room.primaryContact}</span>
      </p>

      <p
        className={cn(
          cachedTheme?.borderColor,
          'w-full flex justify-around border-b p-1'
        )}
      >
        <span className={cn(cachedTheme?.borderColor, 'w-1/2 border-r')}>
          🧑‍🤝‍🧑 {roomData.room.mincapacity}-{roomData.room.maxcapacity}
        </span>
        <span className="w-1/2"> 🏘️ {roomData.room.furnishingStatus}</span>
      </p>

      <p className={cn(cachedTheme?.borderColor, 'w-full text-center ')}>
        Amenities
      </p>
      <p className={cn(cachedTheme?.borderColor, 'w-full p-1')}>
        {roomData.room.amenities.join(', ')}
      </p>
    </div>
  );
});
RoomCard.displayName = 'RoomCard';

const UserCard = React.memo(
  ({ id, interest }: { id: string; interest: InterestedBy }) => {
    const cachedTheme = useThemeState();
    const [deleteInterestedRoom] = useMutation(DELETE_INTERESTED_USER, {
      update(cache, { data }, { variables }) {
        if (!data?.deleteInterestedUser) return;

        const deletedUserId = variables?.userId;
        const targetRoomId = variables?.id;
        let toDelete = false;

        cache.modify({
          id: cache.identify({ __typename: 'RoomData', id: targetRoomId }),
          fields: {
            interestedBy(
              existingInterestedBy: readonly (Reference | StoreObject)[] = [],
              { readField }
            ) {
              const updatedInterestedBy = existingInterestedBy.filter(
                (entry) => {
                  const userId = readField('id', readField('user', entry));
                  return userId !== deletedUserId;
                }
              );
              if (!updatedInterestedBy.length) toDelete = true;
              return updatedInterestedBy;
            },
          },
        });

        if (toDelete) {
          cache.modify({
            fields: {
              interestedRooms(existingRoomsRefs = [], { readField }) {
                return existingRoomsRefs.filter(
                  (roomRef: Reference | StoreObject | undefined) => {
                    const roomId = readField('id', roomRef);
                    return roomId !== targetRoomId;
                  }
                );
              },
            },
          });
        }
      },
    });
    return (
      <div
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.borderColor,
          `p-1 border-y border-r max-xsm:border-l transition-transform duration-200 hover:scale-105 hover:ring-1 ${cachedTheme?.activeRingColor}`
        )}
      >
        <p className={cn(cachedTheme?.borderColor, 'p-1 border-b')}>
          👤 {interest.user.name}
        </p>
        <p className={cn(cachedTheme?.borderColor, 'p-1 border-b')}>
          📞 {interest.user.number || 'Not Available'}
        </p>
        <p className={cn(cachedTheme?.borderColor, 'p-1 border-b')}>
          📧 {interest.user.email}
        </p>
        <p className={cn(cachedTheme?.borderColor, 'p-1 border-b')}>
          🗓️ {timeAgoDetailed(interest.createdAt)} (Interested)
        </p>

        <button
          className={cn(
            cachedTheme?.activeBg,
            cachedTheme?.activeTextColor,
            `mt-2 p-1 rounded hover:scale-105`
          )}
          onClick={async () =>
            await deleteInterestedRoom({
              variables: {
                id,
                userId: interest.user.id,
              },
            })
          }
        >
          🗑️ Delete
        </button>
      </div>
    );
  }
);
UserCard.displayName = 'UserCard';
