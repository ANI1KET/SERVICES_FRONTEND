// import UpperLayout from "./components/HomeLayouts/UpperLayout";
// import LowerLayout from "./components/HomeLayouts/LowerLayout";
// import MiddleLayout from "./components/HomeLayouts/MiddleLayout";

// const Home: React.FC = () => {
//   return (
//     <main className="">
//       <UpperLayout />
//       <MiddleLayout />
//       <LowerLayout />
//     </main>
//   );
// };

// export default Home;

"use client";

import { useEffect, useState } from "react";
import UpperLayout from "./components/HomeLayouts/UpperLayout";
import LowerLayout from "./components/HomeLayouts/LowerLayout";
import MiddleLayout from "./components/HomeLayouts/MiddleLayout";

interface LocationData {
  country: string;
  city: string;
}

const Home: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getLocation = async (): Promise<LocationData | null> => {
      try {
        const response = await fetch("http://localhost:5000/location");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const data = await response.json();
        return {
          country: data.country,
          city: data.city,
        };
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    const fetchLocation = async () => {
      const locationData = await getLocation();
      setLocation(locationData);
      setLoading(false);
    };

    fetchLocation();
  }, []);

  return (
    <main>
      <UpperLayout />
      <MiddleLayout />
      <LowerLayout />
    </main>
  );
};

export default Home;
