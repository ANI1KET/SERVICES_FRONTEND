// // 'use client';

// // import { useLazyQuery, useMutation } from '@apollo/client';

// // import { users } from '../../graphQL/userQuery';
// // import { updateRoom } from '../../graphQL/roomQuery';

// // const Room = () => {
// //   // const { loading, data, error } = useQuery(gql(users));
// //   const [
// //     getUsers,
// //     { loading: loadingUsers, data: usersData, error: usersDataError },
// //   ] = useLazyQuery(users);
// //   const [
// //     update,
// //     { data: updatedRoomData },
// //     // { loading: updatingRoom, data: updatedRoomData, error: updatedRoomError },
// //   ] = useMutation(updateRoom);

// //   if (usersDataError) return <h1>Error Occured</h1>;
// //   return loadingUsers ? (
// //     <div>loading...</div>
// //   ) : (
// //     <>
// //       <div className="" onClick={() => getUsers()}>
// //         {JSON.stringify(usersData)}Users
// //       </div>
// //       <div
// //         className=""
// //         onClick={() =>
// //           update({
// //             variables: { id: '679c93ff9ad9169243fa449c', availability: true },
// //           })
// //         }
// //       >
// //         {JSON.stringify(updatedRoomData)}
// //         Update Room
// //       </div>
// //     </>
// //   );
// // };

// // export default Room;

// const AdminRoomDashboard = () => {
//   return <div></div>;
// };

// export default AdminRoomDashboard;

'use client';

import { Room } from '@prisma/client';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

import { LIMIT } from '../../variables';
import { GET_LISTED_ROOMS } from '../../graphQL/userQuery';
import MainLayout from '../../components/admin/room/MainLayout';
import SearchLayout from '../../components/admin/room/SearchLayout';

const OwnerRoomDashboard = () => {
  const session = useSession();

  const { data, loading, error, fetchMore } = useQuery<{
    user: { rooms: Room[] };
  }>(GET_LISTED_ROOMS, {
    // fetchPolicy: 'cache-and-network',
    variables: { id: session.data?.user.userId, offset: 0, limit: LIMIT },
  });
  return (
    <div className="w-full overflow-x-hidden overflow-y-scroll">
      <SearchLayout>
        <MainLayout
          data={data}
          error={error}
          loading={loading}
          fetchMore={fetchMore}
        />
      </SearchLayout>
    </div>
  );
};

export default OwnerRoomDashboard;
