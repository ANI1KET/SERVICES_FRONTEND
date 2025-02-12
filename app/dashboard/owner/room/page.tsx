'use client';

import { Room } from '@prisma/client';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { GET_USER_LISTED_ROOMS } from '../../graphQL/userQuery';

const LIMIT = 2;

const OwnerRoomDashboard = () => {
  const session = useSession();
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, loading, error, fetchMore } = useQuery(GET_USER_LISTED_ROOMS, {
    // fetchPolicy: 'cache-and-network',
    variables: { id: session.data?.user.userId, offset: 0, limit: LIMIT },
  });

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

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error fetching users.</p>;
  return (
    <div>
      {data.user.rooms.map((room: Room) => (
        <div key={room.id} className="">
          <p>City: {room.city}</p>
          <p>Location: {room.location}</p>
        </div>
      ))}
      {hasMore && (
        <div
          ref={observerRef}
          style={{ height: 50, background: 'transparent' }}
        />
      )}
    </div>
  );
};

export default OwnerRoomDashboard;
