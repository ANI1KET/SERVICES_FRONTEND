'use client';

import {
  Unmasked,
  ApolloError,
  ApolloQueryResult,
  OperationVariables,
  FetchMoreQueryOptions,
} from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import RoomLayoutCard from './roomLayoutCard';
import { ListedRoom } from '@/app/types/types';
import { LIMIT } from '@/app/lib/reusableConst';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';

type ChildComponentProps = {
  data?: { cityLocationRooms: ListedRoom[] };
  loading: boolean;
  error?: ApolloError;
  fetchMore: <
    TFetchData = { cityLocationRooms: ListedRoom[] },
    TFetchVars extends OperationVariables = OperationVariables
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
      updateQuery?: (
        previousQueryResult: { cityLocationRooms: ListedRoom[] },
        options: {
          fetchMoreResult: Unmasked<TFetchData>;
          variables: TFetchVars;
        }
      ) => { cityLocationRooms: ListedRoom[] };
    }
  ) => Promise<ApolloQueryResult<TFetchData>>;
};

const SearchedLayout: React.FC<ChildComponentProps> = ({
  data,
  loading,
  error,
  fetchMore,
}) => {
  const session = useSession();
  const cachedTheme = useThemeState();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [hasMore, setHasMore] = useState(true);

  const loadMoreData = useCallback(() => {
    if (!hasMore) return;
    fetchMore({
      variables: {
        limit: LIMIT,
        id: session.data?.user.userId,
        offset: data?.cityLocationRooms.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.cityLocationRooms.length < LIMIT) {
          setHasMore(false);
        }

        return {
          cityLocationRooms: [
            ...prev.cityLocationRooms,
            ...fetchMoreResult.cityLocationRooms,
          ],
        };
      },
    });
  }, [
    hasMore,
    fetchMore,
    session.data?.user.userId,
    data?.cityLocationRooms.length,
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
      {data?.cityLocationRooms.map((room: ListedRoom) => (
        <RoomLayoutCard key={room.id} room={room} />
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

export default SearchedLayout;
