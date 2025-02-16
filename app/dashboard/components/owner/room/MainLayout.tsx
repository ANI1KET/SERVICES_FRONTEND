'use client';

import {
  gql,
  Unmasked,
  useMutation,
  ApolloError,
  useApolloClient,
  ApolloQueryResult,
  OperationVariables,
  FetchMoreQueryOptions,
} from '@apollo/client';
import { Room } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Select, MenuItem } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';

import { LIMIT } from '@/app/dashboard/variables';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { updateRoom } from '@/app/dashboard/graphQL/roomQuery';
import { useThemeState } from '@/app/providers/reactqueryProvider';

type ChildComponentProps = {
  data?: { user: { rooms: Room[] } };
  loading: boolean;
  error?: ApolloError;
  fetchMore: <
    TFetchData = { user: { rooms: Room[] } },
    TFetchVars extends OperationVariables = OperationVariables
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
      updateQuery?: (
        previousQueryResult: { user: { rooms: Room[] } },
        options: {
          fetchMoreResult: Unmasked<TFetchData>;
          variables: TFetchVars;
        }
      ) => { user: { rooms: Room[] } };
    }
  ) => Promise<ApolloQueryResult<TFetchData>>;
};

const MainLayout: React.FC<ChildComponentProps> = ({
  data,
  loading,
  error,
  fetchMore,
}) => {
  const session = useSession();
  const client = useApolloClient();
  const cachedTheme = useThemeState();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [hasMore, setHasMore] = useState(true);
  const [editedRooms, setEditedRooms] = useState<Record<string, Partial<Room>>>(
    {}
  );

  const [update] = useMutation(updateRoom);

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

  const loadMoreData = useCallback(() => {
    if (!hasMore) return;
    fetchMore({
      variables: {
        limit: LIMIT,
        id: session.data?.user.userId,
        offset: data?.user.rooms.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.user.rooms.length < LIMIT) {
          setHasMore(false);
        }

        return {
          user: {
            ...prev.user,
            rooms: [...prev.user.rooms, ...fetchMoreResult.user.rooms],
          },
        };
      },
    });
  }, [hasMore, fetchMore, session.data?.user.userId, data?.user.rooms.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      {
        root: null,
        rootMargin: '300px',
        threshold: 0,
      }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      observer.disconnect();
      // if (target) observer.unobserve(target);
    };
  }, [loadMoreData]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching rooms.</p>;
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-2 max-xsm:grid-cols-1 gap-4 p-4">
      {data?.user.rooms.map((room: Room) => (
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
            className={cn(
              cachedTheme?.textColor,
              'col-span-4 text-xl font-medium'
            )}
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
            className={cn(
              'col-span-2 flex items-center',
              cachedTheme?.textColor
            )}
          >
            👤
            <input
              type="text"
              value={
                editedRooms[room.id]?.primaryContact ?? room.primaryContact
              }
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
            className={cn(
              'col-span-2 flex items-center',
              cachedTheme?.textColor
            )}
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
            {room.bedroom > 0
              ? room.bedroom > 1
                ? `${room.bedroom}B`
                : 'B'
              : ''}
            {room.hall > 0 ? (room.hall > 1 ? `${room.hall}H` : 'H') : ''}
            {room.kitchen > 0
              ? room.kitchen > 1
                ? `${room.kitchen}K`
                : 'K'
              : ''}
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
              'col-span-2 p-1 rounded-2xl',
              cachedTheme?.activeBg,
              cachedTheme?.activeTextColor
            )}
          >
            🗑️ Delete
          </button>

          <button
            type="submit"
            className={cn(
              'col-span-2 p-1 rounded-2xl',
              cachedTheme?.activeBg,
              cachedTheme?.activeTextColor
            )}
          >
            ✏️ Update
          </button>
        </form>
      ))}

      {hasMore && (
        <div ref={observerRef} className="flex justify-center items-center">
          <div
            className={cn(
              cachedTheme?.activeBg,
              'w-8 h-8 border-4 border-t-transparent rounded-full animate-spin'
            )}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
