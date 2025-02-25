import { gql } from '@apollo/client';
import { Room } from '@prisma/client';
import { useCallback, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { useApolloClient, useMutation } from '@apollo/client';

import { cn } from '@/app/lib/utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import { DeleteRoom, UpdateRoom } from '@/app/dashboard/graphQL/roomQuery';

const RoomLayoutCard = ({
  room,
  isFilter,
  setIsFilter,
}: {
  room: Room;
  setIsFilter?: React.Dispatch<
    React.SetStateAction<{
      cityLocation: boolean;
      id: boolean;
    }>
  >;
  isFilter?: { cityLocation: boolean; id: boolean };
}) => {
  const client = useApolloClient();
  const cachedTheme = useThemeState();

  const [update] = useMutation(UpdateRoom);
  const [deleteRoom] = useMutation(DeleteRoom);
  const [editedRooms, setEditedRooms] = useState<Record<string, Partial<Room>>>(
    {}
  );

  const handleChange = useCallback(
    (roomId: string, field: keyof Room, value: number | string | boolean) => {
      setEditedRooms((prev) => ({
        ...prev,
        [roomId]: { ...prev[roomId], [field]: value },
      }));
    },
    []
  );

  const handleUpdate = useCallback(
    async (roomId: string) => {
      if (!editedRooms[roomId]) return;

      try {
        await update({
          variables: { id: roomId, ...editedRooms[roomId] },
        });

        const roomToUpdate = client.readFragment({
          id: `Room:${roomId}`,
          fragment: gql`
            fragment ExistingRoom on Room {
              id
              city
              name
              hall
              price
              kitchen
              bedroom
              location
              direction
              amenities
              available
              ownerContact
              primaryContact
              furnishingStatus
            }
          `,
        });
        const newAmenities = (editedRooms[roomId]?.amenities ?? []).filter(
          (amenity) => amenity?.trim() !== ''
        );
        client.writeFragment({
          id: `Room:${roomId}`,
          fragment: gql`
            fragment UpdatedRoom on Room {
              id
              city
              name
              hall
              price
              kitchen
              bedroom
              location
              direction
              amenities
              available
              ownerContact
              primaryContact
              furnishingStatus
            }
          `,
          data: {
            ...roomToUpdate,
            ...editedRooms[roomId],
            amenities: [...roomToUpdate?.amenities, ...newAmenities],
          },
        });
      } catch (error) {
        console.error(`Failed to update room :`, error);
      } finally {
        setEditedRooms((prev) => {
          const updated = { ...prev };
          delete updated[roomId];
          return updated;
        });
      }
    },
    [editedRooms, update, client]
  );

  const handleDelete = useCallback(
    async (roomId: string) => {
      try {
        await deleteRoom({
          variables: { id: roomId },
        });

        client.cache.evict({ id: `Room:${roomId}` });
        // client.cache.evict({ fieldName: 'room', args: { id: roomId } });
        client.cache.gc();

        if (isFilter) setIsFilter?.({ ...isFilter, id: false });
      } catch (error) {
        console.error(`Failed to delete room:`, error);
      }
    },
    [client.cache, deleteRoom, isFilter, setIsFilter]
  );
  return (
    <form
      key={room.id}
      className={cn(
        cachedTheme?.borderColor,
        'grid grid-cols-4 gap-2 p-2 relative rounded-xl shadow-lg border hover:shadow-2xl transform transition-all'
      )}
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdate(room.id);
      }}
    >
      <h3
        className={cn(cachedTheme?.textColor, 'col-span-4 text-xl font-medium')}
      >
        {room.name} <span className="font-semibold">({room.city})</span>
      </h3>

      <label
        className={cn(
          cachedTheme?.textColor,
          'col-span-2 flex items-center text-lg font-medium'
        )}
      >
        Rs.
        <input
          type="number"
          value={editedRooms[room.id]?.price ?? room.price}
          onChange={(e) =>
            handleChange(room.id, 'price', Number(e.target.value))
          }
          className={'w-full bg-transparent outline-none pl-1'}
        />
      </label>

      <div className="col-span-2 ">
        <Select
          value={String(editedRooms[room.id]?.available ?? room.available)}
          onChange={(e) =>
            handleChange(room.id, 'available', e.target.value === 'true')
          }
          className={cn(cachedTheme?.textColor, 'w-full')}
          disableUnderline
          variant="standard"
          sx={{
            width: '100%',
            background: 'transparent',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none !important',
            },
            '& .MuiInputBase-root': {
              borderBottom: 'none !important',
            },
            '& .MuiSelect-select': {
              color:
                (editedRooms[room.id]?.available ?? room.available) === true
                  ? 'green'
                  : 'red',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                color: cachedTheme?.selectMenuTextColor,
                backgroundColor: cachedTheme?.selectMenuBg,
              },
            },
          }}
        >
          <MenuItem
            value={'true'}
            key={'available'}
            sx={{
              '&.MuiMenuItem-root:hover': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
              '&.Mui-focusVisible': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
            }}
          >
            {'Available'}
          </MenuItem>
          <MenuItem
            value={'false'}
            key={'unavailable'}
            sx={{
              '&.MuiMenuItem-root:hover': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
              '&.Mui-focusVisible': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
            }}
          >
            {'Not available'}
          </MenuItem>
        </Select>
      </div>

      <div className={cn(cachedTheme?.textColor, 'col-span-4 font-medium')}>
        🌍 {room.location}
      </div>

      <div className={cn(cachedTheme?.textColor, 'col-span-4 font-medium')}>
        📍 {room.direction}
      </div>

      <label
        title="Owner"
        className={cn('col-span-2 flex items-center', cachedTheme?.textColor)}
      >
        👤
        <input
          type="text"
          value={editedRooms[room.id]?.primaryContact ?? room.primaryContact}
          required
          maxLength={10}
          minLength={10}
          pattern="[0-9]{10}"
          onChange={(e) => {
            handleChange(room.id, 'primaryContact', e.target.value);
          }}
          className="bg-transparent outline-none"
        />
      </label>

      <label
        className={cn('col-span-2 flex items-center', cachedTheme?.textColor)}
      >
        📞
        <input
          type="text"
          required
          maxLength={10}
          minLength={10}
          pattern="[0-9]{10}"
          className="bg-transparent outline-none"
          onChange={(e) => {
            handleChange(room.id, 'ownerContact', e.target.value);
          }}
          value={editedRooms[room.id]?.ownerContact ?? room.ownerContact}
        />
      </label>

      <div
        className={cn(
          cachedTheme?.textColor,
          'col-span-2 flex items-center text-lg font-medium'
        )}
      >
        🏡{'  '}
        {room.bedroom > 0 ? (room.bedroom > 1 ? `${room.bedroom}B` : 'B') : ''}
        {room.hall > 0 ? (room.hall > 1 ? `${room.hall}H` : 'H') : ''}
        {room.kitchen > 0 ? (room.kitchen > 1 ? `${room.kitchen}K` : 'K') : ''}
      </div>

      <div className="col-span-2">
        {/* <span>🛏️</span> */}
        <Select
          value={String(
            editedRooms[room.id]?.furnishingStatus ?? room.furnishingStatus
          )}
          onChange={(e) =>
            handleChange(room.id, 'furnishingStatus', e.target.value)
          }
          className={cn(cachedTheme?.textColor, 'w-full')}
          disableUnderline
          variant="standard"
          sx={{
            width: '100%',
            background: 'transparent',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none !important',
            },
            '& .MuiInputBase-root': {
              borderBottom: 'none !important',
            },
            '& .MuiSelect-select': {
              color: cachedTheme?.selectIcon,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                color: cachedTheme?.selectMenuTextColor,
                backgroundColor: cachedTheme?.selectMenuBg,
              },
            },
          }}
        >
          <MenuItem
            key={'FURNISHED'}
            value={'FURNISHED'}
            sx={{
              '&.MuiMenuItem-root:hover': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
              '&.Mui-focusVisible': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
            }}
          >
            {'Furnished'}
          </MenuItem>
          <MenuItem
            value={'SEMIFURNISHED'}
            key={'SEMIFURNISHED'}
            sx={{
              '&.MuiMenuItem-root:hover': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
              '&.Mui-focusVisible': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
            }}
          >
            {'Semifurnished'}
          </MenuItem>
          <MenuItem
            value={'UNFURNISHED'}
            key={'UNFURNISHED'}
            sx={{
              '&.MuiMenuItem-root:hover': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
              '&.Mui-focusVisible': {
                backgroundColor: cachedTheme?.selectMenuHoverFocused,
              },
            }}
          >
            {'Unfurnished'}
          </MenuItem>
        </Select>
      </div>

      <div className="col-span-4 flex ">
        🌟
        <p className="overflow-x-auto ">
          {room.amenities.map((amenity, index) => (
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
        </p>
        {editedRooms[room.id]?.amenities?.map((amenity, index) => (
          <input
            key={index}
            type="text"
            value={amenity}
            onChange={(e) => {
              setEditedRooms((prev) => {
                const currentAmenities = prev[room.id]?.amenities ?? [];
                const updatedAmenities = [...currentAmenities];
                updatedAmenities[index] = e.target.value.toUpperCase();

                return {
                  ...prev,
                  [room.id]: {
                    ...prev[room.id],
                    amenities: updatedAmenities,
                  },
                };
              });
            }}
            className={cn(
              cachedTheme?.activeBg,
              cachedTheme?.activeTextColor,
              'w-16 text-xs p-1 rounded-full font-medium'
            )}
          />
        ))}
        <button
          type="button"
          onClick={() => {
            setEditedRooms((prev) => {
              const currentAmenities = prev[room.id]?.amenities ?? [];
              return {
                ...prev,
                [room.id]: {
                  ...prev[room.id],
                  amenities: [...currentAmenities, ''],
                },
              };
            });
          }}
        >
          ➕
        </button>
      </div>

      <button
        type="button"
        className={cn(
          cachedTheme?.activeBg,
          cachedTheme?.activeTextColor,
          'col-span-2 p-1 rounded-2xl'
        )}
        onClick={() => handleDelete(room.id)}
      >
        🗑️ Delete
      </button>

      <button
        type="submit"
        className={cn(
          cachedTheme?.activeBg,
          cachedTheme?.activeTextColor,
          'col-span-2 p-1 rounded-2xl'
        )}
      >
        ✏️ Update
      </button>
    </form>
  );
};

export default RoomLayoutCard;
