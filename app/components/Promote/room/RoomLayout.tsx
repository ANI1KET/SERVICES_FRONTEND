'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  promoteRoom,
  addPromotion,
  getPromotingDetails,
  getListerRoomsDetails,
} from '../../../promote/ServerAction';
import { ListedRoom } from '@/app/types/types';
import { updateNumber } from '../../ServerAction';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { PROMOTE_PAGE_SIZE } from '@/app/lib/reusableConst';
import { ListersRooms, RoomListers } from '@/app/promote/types';
import { useThemeState } from '@/app/providers/reactqueryProvider';

const RoomLayout = () => {
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();

  const { data: session, update } = useSession();
  const userId = session?.user.userId as string;
  const userContact = session?.user.number as string;

  const listerObserverRef = useRef<HTMLDivElement | null>(null);
  const [promotionState, setPromotionState] = useState<{
    promotedListers: Record<string, boolean>;
    promotionDealsId: Record<string, string>;
  }>({
    promotedListers: {},
    promotionDealsId: {},
  });

  const {
    error,
    isError,
    hasNextPage,
    data: listers,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['Listers'],
    queryFn: async ({ pageParam = 0 }) => {
      const { listers, listerRooms } = await getPromotingDetails({
        userId,
        offset: pageParam,
      });

      const listersRooms: ListersRooms = listerRooms.reduce(
        (acc: ListersRooms, room: ListedRoom) => {
          (acc[room.listerId] ||= []).push(room);
          return acc;
        },
        {}
      );

      queryClient.setQueryData<ListersRooms>(['ListersRooms'], (prevData) => {
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
    enabled: false,
    gcTime: Infinity,
    initialPageParam: 0,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const promoteMutation = useMutation({
    mutationFn: async ({
      agreementId,
    }: {
      listerId: string;
      agreementId: string;
    }) => {
      const promotionDealId = await promoteRoom({
        userId,
        agreementId,
      });
      return promotionDealId;
    },
    onSuccess: (promotionDealId, variables) => {
      const { listerId } = variables;

      setPromotionState((prev) => ({
        promotedListers: {
          ...prev.promotedListers,
          [listerId]: true,
        },
        promotionDealsId: {
          ...prev.promotionDealsId,
          [listerId]: promotionDealId,
        },
      }));
    },
  });

  const showNumberInputPopup = async () => {
    const { value } = await Swal.fire({
      title: 'Contact',
      input: 'text',
      inputPlaceholder: 'Enter your number...',
      inputAttributes: {
        maxlength: '10',
        pattern: '[0-9]{10}',
        inputmode: 'numeric',
      },
      width: 300,
      padding: '1rem',
      showCancelButton: true,
      confirmButtonText: 'Done',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          'rounded-lg'
        ),
        cancelButton: cn(
          'rounded-lg',
          cachedTheme?.activeBg,
          cachedTheme?.activeTextColor
        ),
        popup: 'rounded-xl shadow-lg',
        title: cn(cachedTheme?.textColor, 'text-lg font-bold'),
      },
      inputValidator: (value) => {
        return /^\d{10}$/.test(value)
          ? Promise.resolve(null)
          : Promise.resolve('Please enter a valid 10-digit number!');
      },
    });

    if (value) {
      const response = await updateNumber({
        number: value,
        userId: session?.user.userId as string,
      });
      if (response !== 'Failed')
        await update({
          ...session,
          user: {
            ...session?.user,
            number: value,
          },
        });
    }
  };

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

  if (isError) <div>{error.message}</div>;
  return (
    <main className="w-full overflow-y-scroll">
      <h1 className={cn(cachedTheme?.borderColor, 'text-center')}>
        Room Promotion
      </h1>

      <div className="grid gap-2 max-xsm:gap-5">
        {listers?.pages.map((page, pageIndex: number) =>
          page.map((lister, listerIndex) => (
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
                  🆔 {lister.id}
                </p>
                <p
                  className={cn(
                    cachedTheme.bg,
                    cachedTheme.borderColor,
                    'border-t p-[1px] '
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
                    !!promotionState.promotedListers[lister.id]
                      ? 'border-y p-[1px] rounded-bl-lg'
                      : 'border-t p-[1px]'
                  )}
                >
                  📧 {lister.email}
                </p>

                <button
                  className={cn(
                    cachedTheme.activeBg,
                    cachedTheme.activeTextColor,
                    cachedTheme.activeBorderColor,
                    { hidden: !!promotionState.promotedListers[lister.id] },
                    'border rounded-bl-lg max-xsm:rounded-bl-none '
                  )}
                  onClick={async () => {
                    if (!userContact) showNumberInputPopup();
                    promoteMutation.mutate({
                      listerId: lister.id,
                      agreementId: lister.agreementId,
                    });
                  }}
                >
                  Want to Promote ?
                </button>
              </div>

              <ListerRooms
                lister={lister}
                isPromoted={!!promotionState.promotedListers[lister.id]}
                promotionDealId={promotionState.promotionDealsId[lister.id]}
              />
            </div>
          ))
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
  isPromoted,
  promotionDealId,
}: {
  lister: RoomListers;
  isPromoted: boolean;
  promotionDealId: string;
}) => {
  const cachedTheme = useThemeState();
  const queryClient = useQueryClient();
  const [deletedRoom, setDeletedRoom] = useState(0);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: listerRooms } = useQuery<ListersRooms>({
    queryKey: ['ListersRooms'],
    queryFn: () => Promise.resolve({} as ListersRooms),
    enabled: false,
    gcTime: Infinity,
  });

  const { mutate: loadMoreRooms, isPending: isFetchingNextPage } = useMutation({
    mutationFn: async (offset: number) => {
      return getListerRoomsDetails({
        offset,
        listerId: lister.id,
      });
    },
    onSuccess: (newListerRooms) => {
      const existingData = queryClient.getQueryData([
        'ListersRooms',
      ]) as ListersRooms;

      const updatedRooms: ListersRooms = {
        ...existingData,
        [lister.id]: [...existingData[lister.id], ...newListerRooms],
        // [lister.id]: [...(existingData?.[lister.id] ?? []), ...newListerRooms],
      };

      queryClient.setQueryData(['ListersRooms'], updatedRooms);
    },
  });

  const handleLoadMore = useCallback(() => {
    const offset =
      (listerRooms as ListersRooms)[lister.id].length + deletedRoom;
    // const offset = (listerRooms?.[lister.id] ?? []).length;

    if (offset % PROMOTE_PAGE_SIZE === 0 && !isFetchingNextPage) {
      loadMoreRooms(offset);
    }
  }, [listerRooms, isFetchingNextPage, lister.id, loadMoreRooms, deletedRoom]);

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
      {listerRooms?.[lister.id].map((room) => (
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
            disabled={!isPromoted}
            className={cn(
              'border ',
              cachedTheme.activeBg,
              cachedTheme.activeTextColor,
              cachedTheme.activeBorderColor,
              { 'opacity-50 cursor-not-allowed': !isPromoted }
            )}
            onClick={async () => {
              await addPromotion({
                roomId: room.id,
                promotionDealId,
                agreementId: lister.agreementId,
              });

              queryClient.setQueryData(
                ['ListersRooms'],
                (data: ListersRooms | undefined) => {
                  if (!data) return data;

                  return {
                    ...data,
                    [lister.id]:
                      listerRooms[lister.id]?.filter((r) => r.id !== room.id) ||
                      [],
                  };
                }
              );
              setDeletedRoom((prev) => ++prev);
            }}
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
