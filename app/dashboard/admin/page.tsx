// 'use client';

// import { Bar } from 'react-chartjs-2';
// import { useQuery } from '@apollo/client';
// import { useSession } from 'next-auth/react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// import { RoomStats } from '../types';
// import { GET_LISTED_ROOM_STATS } from '../graphQL/dashboardQuery';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Admin = () => {
//   const session = useSession();
//   const { loading, data, error } = useQuery<{ totalListedRoom: RoomStats[] }>(
//     GET_LISTED_ROOM_STATS,
//     {
//       skip: !session.data?.user.userId,
//       variables: { id: session.data?.user.userId },
//     }
//   );

//   const cities = data?.totalListedRoom.map((item) => item.city);
//   const availableRooms = data?.totalListedRoom.map(
//     (item) => item.availableRooms
//   );
//   const unavailableRooms = data?.totalListedRoom.map(
//     (item) => item.unavailableRooms
//   );

//   const chartData = {
//     labels: cities,
//     datasets: [
//       {
//         label: 'Available Rooms',
//         data: availableRooms,
//         backgroundColor: 'rgba(75, 192, 75, 0.6)', // Green
//       },
//       {
//         label: 'Unavailable Rooms',
//         data: unavailableRooms,
//         backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         display: false,
//       },
//     },
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'City-wise Room Availability',
//       },
//     },
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching users.</p>;
//   return <Bar data={chartData} options={options} />;
// };

// export default Admin;

'use client';

import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

import { RoomStats } from '../types';
import { GET_LISTED_ROOM_STATS } from '../graphQL/dashboardQuery';

const Admin = () => {
  const session = useSession();
  const { loading, data, error } = useQuery<{ totalListedRoom: RoomStats }>(
    GET_LISTED_ROOM_STATS,
    {
      skip: !session.data?.user.userId,
      variables: { id: session.data?.user.userId },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users.</p>;
  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <h1>Room Statistics</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {data?.totalListedRoom.cityWiseStats.map((cityData, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: '0.3s',
              backgroundColor: '#fff',
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>{cityData.city}</h3>
            <p>
              Total Rooms: <strong>{cityData.totalRooms}</strong>
            </p>
            <p style={{ color: 'green' }}>
              Available: {cityData.availableRooms}
            </p>
            <p style={{ color: 'red' }}>
              Unavailable: {cityData.unavailableRooms}
            </p>
          </div>
        ))}
      </div>
      {/* <table
        style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}
      >
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>City</th>
            <th style={{ padding: '10px' }}>Total Rooms</th>
            <th
              style={{
                padding: '10px',
                color: 'green',
              }}
            >
              Available Rooms
            </th>
            <th
              style={{
                padding: '10px',
                color: 'red',
              }}
            >
              Unavailable Rooms
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.totalListedRoom.map((cityData, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {cityData.city}
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {cityData.totalRooms}
              </td>
              <td
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ddd',
                  color: 'green',
                }}
              >
                {cityData.availableRooms}
              </td>
              <td
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ddd',
                  color: 'red',
                }}
              >
                {cityData.unavailableRooms}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Admin;
