'use client';

import {
  Unmasked,
  ApolloError,
  useReactiveVar,
  ApolloQueryResult,
  OperationVariables,
  FetchMoreQueryOptions,
} from '@apollo/client';
import { useSession } from 'next-auth/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import {
  useThemeState,
  deletedRoomIds,
} from '@/app/providers/reactqueryProvider';
import RoomLayoutCard from './roomLayoutCard';
import { ListedRoom } from '@/app/types/types';
import { LIMIT } from '@/app/lib/reusableConst';
import { cn } from '@/app/lib/utils/tailwindMerge';

type ChildComponentProps = {
  data?: { user: { rooms: ListedRoom[] } };
  loading: boolean;
  error?: ApolloError;
  fetchMore: <
    TFetchData = { user: { rooms: ListedRoom[] } },
    TFetchVars extends OperationVariables = OperationVariables
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
      updateQuery?: (
        previousQueryResult: { user: { rooms: ListedRoom[] } },
        options: {
          fetchMoreResult: Unmasked<TFetchData>;
          variables: TFetchVars;
        }
      ) => { user: { rooms: ListedRoom[] } };
    }
  ) => Promise<ApolloQueryResult<TFetchData>>;
};

const MainLayout: React.FC<ChildComponentProps> = ({
  data,
  error,
  loading,
  fetchMore,
}) => {
  const session = useSession();
  const cachedTheme = useThemeState();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const deletedRoomIdsCount = useReactiveVar(deletedRoomIds);

  const loadMoreData = useCallback(() => {
    if (!hasMore) return;
    fetchMore({
      variables: {
        limit: LIMIT,
        id: session.data?.user.userId,
        offset: (data?.user.rooms.length || 0) + deletedRoomIdsCount.size,
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
  }, [
    hasMore,
    deletedRoomIdsCount.size,
    fetchMore,
    session.data?.user.userId,
    data?.user.rooms.length,
  ]);

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
      {data?.user.rooms.map((room: ListedRoom) => (
        <MemoizedRoomLayoutCard key={room.id} room={room} />
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

const MemoizedRoomLayoutCard = memo(({ room }: { room: ListedRoom }) => {
  return <RoomLayoutCard room={room} />;
});
MemoizedRoomLayoutCard.displayName = 'MemoizedRoomLayoutCard';

export default MainLayout;
