'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef } from 'react';

import {
  GroupedRooms,
  NewListedRoom,
  UserFromRoomData,
} from '@/app/types/types';
import {
  getPromotionLink,
  getPromotingDetails,
  getListerRoomsDetails,
} from '../../ServerAction';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { PROMOTE_PAGE_SIZE } from '@/app/lib/reusableConst';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const RoomLayout = () => {
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();
  const listerObserverRef = useRef<HTMLDivElement | null>(null);

  const { data: listerRooms } = useQuery<GroupedRooms>({
    queryKey: ['ListersRooms'],
    queryFn: () => Promise.resolve({} as GroupedRooms),
    enabled: false,
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
  });

  const {
    hasNextPage,
    data: listers,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['Listers'],
    queryFn: async ({ pageParam = 0 }) => {
      const { listers, listerRooms } = await getPromotingDetails({
        offset: pageParam,
      });

      const listersRooms: GroupedRooms = listerRooms.reduce(
        (acc: GroupedRooms, room: NewListedRoom) => {
          (acc[room.listerId] ||= []).push(room);
          return acc;
        },
        {}
      );

      queryClient.setQueryData<GroupedRooms>(['ListersRooms'], (prevData) => {
        return {
          ...(prevData || {}),
          ...listersRooms,
        };
      });

      return listers;
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentOffset = allPages.length * PROMOTE_PAGE_SIZE;
      return lastPage.length === PROMOTE_PAGE_SIZE ? currentOffset : undefined;
    },
    initialPageParam: 0,
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const target = listerObserverRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleLoadMore]);
  return (
    <main className="w-full overflow-y-scroll">
      <h1 className={cn(cachedTheme?.borderColor, 'text-center')}>
        Room Promotion
      </h1>

      <div className="grid gap-2 max-xsm:gap-5">
        {listers?.pages.map((page, pageIndex: number) =>
          page.map(
            (lister, listerIndex) => (
              // [0, 1, 2, 3].map((_, i) => (
              <div
                key={`${pageIndex + 1}${listerIndex}`}
                className={cn(
                  'grid max-xsm:gap-1 max-xsm:grid-cols-1 grid-cols-4 xl:grid-cols-5'
                )}
              >
                <div
                  className={cn(
                    cachedTheme.borderColor,
                    'flex flex-col col-span-1 justify-center font-semibold break-words border-r'
                  )}
                >
                  <p
                    className={cn(
                      cachedTheme.bg,
                      cachedTheme.borderColor,
                      'p-[1px] border-t rounded-tl-lg max-xsm:rounded-tl-none'
                    )}
                  >
                    💰 {lister.promoteRoomPrice}
                  </p>
                  <p
                    className={cn(
                      cachedTheme.bg,
                      cachedTheme.borderColor,
                      'border-t p-[1px]'
                    )}
                  >
                    👤 {lister.name}
                  </p>
                  <p
                    className={cn(
                      cachedTheme.bg,
                      cachedTheme.borderColor,
                      'border-t p-[1px] '
                    )}
                  >
                    📞 {lister.number}
                  </p>
                  <p
                    className={cn(
                      cachedTheme.bg,
                      cachedTheme.borderColor,
                      'p-[1px] border-y rounded-bl-lg max-xsm:rounded-bl-none'
                    )}
                  >
                    📧 {lister.email}
                  </p>
                </div>

                <ListerRooms
                  lister={lister}
                  listerRooms={listerRooms as GroupedRooms}
                />
              </div>
            )
            // ))
          )
        )}

        <div
          ref={listerObserverRef}
          className="h-10 border-2 border-transparent"
        />
        {isFetchingNextPage && (
          <div className="flex justify-center items-center">
            <div
              className={cn(
                cachedTheme?.activeBg,
                'w-8 h-8 border-4 border-t-transparent rounded-full animate-spin'
              )}
            ></div>
          </div>
        )}
      </div>
    </main>
  );
};

export default RoomLayout;

const ListerRooms = ({
  lister,
  listerRooms,
}: {
  lister: UserFromRoomData;
  listerRooms: GroupedRooms;
}) => {
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { mutate: loadMoreRooms, isPending: isFetchingNextPage } = useMutation({
    mutationFn: async (offset: number) => {
      return getListerRoomsDetails({
        offset,
        listerId: lister.id,
      });
    },
    onSuccess: (newListerRooms) => {
      const existingData = queryClient.getQueryData<GroupedRooms>([
        'ListersRooms',
      ]) as GroupedRooms;

      const updatedRooms: GroupedRooms = {
        ...existingData,
        [lister.id]: [...existingData[lister.id], ...newListerRooms],
        // [lister.id]: [...(existingData?.[lister.id] ?? []), ...newListerRooms],
      };

      queryClient.setQueryData(['ListersRooms'], updatedRooms);
    },
  });

  const handleLoadMore = useCallback(() => {
    const offset = listerRooms[lister.id].length;
    // const offset = (listerRooms?.[lister.id] ?? []).length;

    if (offset % PROMOTE_PAGE_SIZE === 0 && !isFetchingNextPage) {
      loadMoreRooms(offset);
    }
  }, [listerRooms, isFetchingNextPage, loadMoreRooms, lister.id]);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleLoadMore]);
  return (
    <div
      className={cn(
        'flex max-xsm:col-span-1 col-span-3 xl:col-span-4 overflow-x-scroll '
      )}
    >
      {listerRooms[lister.id].map((room) => (
        // {listerRooms?.[lister.id].map((room) => (
        <div
          key={`${room.id}`}
          className={cn(
            cachedTheme.bg,
            cachedTheme.borderColor,
            `flex flex-col justify-center min-w-[250px] flex-shrink-0 border-r border-y `
          )}
        >
          <p className={cn(cachedTheme.borderColor, 'border-b py-1')}>
            👤 {room.name}
          </p>
          <p className={cn(cachedTheme.borderColor, 'border-b py-1')}>
            💰 {room.price} /month
          </p>
          <p className={cn(cachedTheme.borderColor, 'border-b py-1')}>
            📞 {room.primaryContact}
          </p>
          <p className={cn(cachedTheme.borderColor, 'border-b py-1')}>
            🌏 {room.location} ({room.city})
          </p>
          <p className={cn(cachedTheme.borderColor, 'border-b py-1')}>
            📌 {room.direction}
          </p>

          <button
            className={cn(
              'border ',
              cachedTheme.activeBg,
              cachedTheme.activeTextColor,
              cachedTheme.activeBorderColor
            )}
            onClick={() =>
              getPromotionLink({
                roomId: room.id,
                listerId: lister.id,
                userId: session?.user.userId as string,
                pricePerClick: lister.promoteRoomPrice,
              })
            }
          >
            Promote
          </button>
        </div>
      ))}

      <div ref={observerRef} className="h-1 border-2 border-transparent" />
      {isFetchingNextPage && (
        <div className="flex justify-center items-center">
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
