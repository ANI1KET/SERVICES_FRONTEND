// 'use client';

// import { useLazyQuery, useMutation } from '@apollo/client';

// import { users } from '../../graphQL/userQuery';
// import { updateRoom } from '../../graphQL/roomQuery';

// const Room = () => {
//   // const { loading, data, error } = useQuery(gql(users));
//   const [
//     getUsers,
//     { loading: loadingUsers, data: usersData, error: usersDataError },
//   ] = useLazyQuery(users);
//   const [
//     update,
//     { data: updatedRoomData },
//     // { loading: updatingRoom, data: updatedRoomData, error: updatedRoomError },
//   ] = useMutation(updateRoom);

//   if (usersDataError) return <h1>Error Occured</h1>;
//   return loadingUsers ? (
//     <div>loading...</div>
//   ) : (
//     <>
//       <div className="" onClick={() => getUsers()}>
//         {JSON.stringify(usersData)}Users
//       </div>
//       <div
//         className=""
//         onClick={() =>
//           update({
//             variables: { id: '679c93ff9ad9169243fa449c', availability: true },
//           })
//         }
//       >
//         {JSON.stringify(updatedRoomData)}
//         Update Room
//       </div>
//     </>
//   );
// };

// export default Room;

const AdminRoomDashboard = () => {
  return <div></div>;
};

export default AdminRoomDashboard;
