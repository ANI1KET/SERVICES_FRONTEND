'use client';

import { Pie } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { RoomStats } from '../types';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { GET_LISTED_ROOM_STATS } from '../graphQL/dashboardQuery';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import UsersInsterestedRooms from '../components/owner/UsersInsterestedRooms';

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = (count: number) => {
  return Array.from(
    { length: count },
    () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );
};

const Broker = () => {
  const session = useSession();
  const cachedTheme = useThemeState();
  const { loading, data, error } = useQuery<{ totalListedRoom: RoomStats }>(
    GET_LISTED_ROOM_STATS,
    {
      skip: !session.data?.user.userId,
      variables: { id: session.data?.user.userId },
    }
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching data.</p>;

  const cityStats = data?.totalListedRoom.cityWiseStats ?? [];
  const backgroundColors = getRandomColor(cityStats?.length);
  const unavailableColors = getRandomColor(cityStats?.length);

  const cityChartData = {
    labels: cityStats?.map((city) => city.city),
    datasets: [
      {
        label: 'Available Rooms',
        data: cityStats?.map((city) => city.availableRooms),
        backgroundColor: backgroundColors,
      },
      {
        label: 'Unavailable Rooms',
        data: cityStats?.map((city) => city.unavailableRooms),
        backgroundColor: unavailableColors,
      },
    ],
  };

  const totalRoomChartData = {
    labels: ['Available Rooms', 'Unavailable Rooms'],
    datasets: [
      {
        data: [
          parseInt(data?.totalListedRoom?.totalAvailableRooms as string),
          parseInt(data?.totalListedRoom?.totalRoomsListed as string) -
            parseInt(data?.totalListedRoom?.totalAvailableRooms as string),
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: cachedTheme?.labelColor,
          font: {
            size: 14,
          },
        },
      },
    },
  };
  return (
    <div className="w-full mx-auto overflow-scroll">
      <h1
        className={cn(cachedTheme?.textColor, 'text-2xl font-bold text-center')}
      >
        Room Statistics
      </h1>

      <div className="flex flex-wrap justify-around mb-4">
        <div className="">
          <Pie data={totalRoomChartData} options={chartOptions} />
        </div>

        <div className="">
          <Pie data={cityChartData} options={chartOptions} />
        </div>
      </div>

      <div className="">
        <h1
          className={cn(
            cachedTheme?.textColor,
            'text-2xl text-center font-bold'
          )}
        >
          Interested Rooms by Users
        </h1>

        <UsersInsterestedRooms />
      </div>
    </div>
  );
};

export default Broker;
