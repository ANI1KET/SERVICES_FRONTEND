'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteInterestedRoom,
  fetchInterestedRoomDetails,
} from '../ServerAction';
import { NewListedRoom } from '@/app/types/types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { ThemeState, useThemeState } from '@/app/providers/reactqueryProvider';

const InterestedRoom = () => {
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();

  const [interestedRooms, setInterestedRooms] = useState<string[]>([]);
  useEffect(() => {
    const storedRooms = JSON.parse(
      localStorage.getItem('InterestedRooms') || '[]'
    );
    setInterestedRooms(storedRooms);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['interestedRooms'],
    queryFn: () => fetchInterestedRoomDetails(interestedRooms),
    enabled: !!interestedRooms.length,
    refetchOnWindowFocus: false,
  });

  const removeRoom = useCallback(
    async (roomId: string) => {
      try {
        await deleteInterestedRoom(roomId);

        setInterestedRooms((prevRooms) => {
          const updatedRooms = prevRooms.filter((id) => id !== roomId);
          localStorage.setItem('InterestedRooms', JSON.stringify(updatedRooms));
          return updatedRooms;
        });

        queryClient.setQueryData<NewListedRoom[]>(
          ['interestedRooms'],
          (oldData) =>
            oldData ? oldData.filter((room) => room.id !== roomId) : []
        );
      } catch (error) {
        console.error('Failed to delete room:', error);
      }
    },
    [queryClient]
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!interestedRooms.length)
    return (
      <p className="w-full flex justify-center items-center">
        No Interested Room Found!
      </p>
    );
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-2 max-xsm:grid-cols-1 gap-4 p-4 overflow-y-auto">
      <h3 className="lg:col-span-4 md:col-span-3 max-sm:col-span-2 max-xsm:col-span-1 text-xl text-center font-semibold">
        My Interested Rooms
      </h3>

      {data?.map((room) => (
        <RoomCard
          room={room}
          key={room.id}
          removeRoom={removeRoom}
          cachedTheme={cachedTheme}
        />
      ))}
    </div>
  );
};

const RoomCard = memo(
  ({
    room,
    removeRoom,
    cachedTheme,
  }: {
    room: NewListedRoom;
    cachedTheme: ThemeState | undefined;
    removeRoom: (roomId: string) => void;
  }) => {
    const handleCopyId = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        const originalText = target.innerText;
        navigator.clipboard
          .writeText(btoa(room.id))
          .then(() => (target.innerText = '🆔 Copied'))
          .catch(() => (target.innerText = 'Failed'))
          .finally(() => {
            setTimeout(() => {
              target.innerText = originalText;
            }, 1000);
          });
      },
      [room.id]
    );

    return (
      <div
        className={cn(
          cachedTheme?.borderColor,
          'grid grid-cols-4 gap-2 p-2 relative rounded-xl shadow-lg border hover:shadow-2xl transform transition-all'
        )}
      >
        <h3 className={cn(cachedTheme?.textColor, 'col-span-4 font-medium')}>
          {room.name}({room.city})
        </h3>

        <div className={cn(cachedTheme?.textColor, 'col-span-4 font-medium')}>
          🌍 {room.location}
        </div>

        {room.direction && (
          <div className={cn(cachedTheme?.textColor, 'col-span-4 font-medium')}>
            📌 {room.direction}
          </div>
        )}

        <div
          className={cn(
            cachedTheme?.textColor,
            'col-span-2 flex items-center font-medium'
          )}
        >
          Rs.{room.price}/month
        </div>
        <div className="col-span-2 flex justify-end">
          {room.available ? (
            <span className="text-green-500">Available</span>
          ) : (
            <span className="text-red-500">Unavailable</span>
          )}
        </div>

        <div
          title="Owner"
          className={cn('col-span-2 flex items-center', cachedTheme?.textColor)}
        >
          👤
          <p className="bg-transparent outline-none">{room.postedBy}</p>
        </div>
        <div
          className={cn(
            'col-span-2 flex justify-end items-center',
            cachedTheme?.textColor
          )}
        >
          📞
          <p className="bg-transparent outline-none">{room.primaryContact}</p>
        </div>

        <div
          className={cn(cachedTheme?.textColor, 'col-span-2 flex items-center')}
        >
          🏡{'  '}
          {room.roomtype}
        </div>
        <div className="col-span-2 flex justify-end">
          🛏️ {room?.furnishingStatus}
        </div>

        <div className="col-span-3 flex gap-1 overflow-x-scroll">
          🌟
          {room &&
            room.amenities.map((amenity, index) => (
              <span
                key={index}
                className={cn(
                  cachedTheme?.activeBg,
                  cachedTheme?.activeTextColor,
                  'text-xs p-1 rounded-full font-medium'
                )}
              >
                {amenity}
              </span>
            ))}
        </div>
        <div className="col-span-1 flex justify-end">
          🧑‍🤝‍🧑 {room.mincapacity}-{room.maxcapacity}
        </div>

        <button
          type="button"
          className={cn(
            cachedTheme?.activeBg,
            cachedTheme?.activeTextColor,
            'col-span-2 p-1 rounded-2xl'
          )}
          onClick={() => removeRoom(room.id)}
        >
          🗑️ Delete
        </button>

        <button
          title={`${btoa(room.id)}`}
          className={cn(
            cachedTheme?.activeBg,
            cachedTheme?.activeTextColor,
            'col-span-2 p-1 rounded-2xl'
          )}
          onClick={handleCopyId}
        >
          🆔 Copy Id
        </button>
      </div>
    );
  }
);
RoomCard.displayName = 'RoomCard';

export default InterestedRoom;
