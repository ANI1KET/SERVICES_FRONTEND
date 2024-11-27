"use server";

import UpperLayout from "./components/HomeLayouts/UpperLayout";
import LowerLayout from "./components/HomeLayouts/LowerLayout";
import MiddleLayout from "./components/HomeLayouts/MiddleLayout";
import ListNavigation from "./components/HomeLayouts/ListNavigation";
import UpperSearchBox from "./components/HomeLayouts/MiddleLayout/UpperSearchBox";
import LowerSearchBox from "./components/HomeLayouts/MiddleLayout/LowerSearchBox";

const Home = () => {
  return (
    <main>
      <ListNavigation />
      <UpperLayout />
      <MiddleLayout>
        <UpperSearchBox />
        <hr className="border-black" />
        <LowerSearchBox />
      </MiddleLayout>
      {/* <MiddleLayout
        upperComponent={<UpperSearchBox />}
        lowerComponent={<LowerSearchBox />}
      /> */}
      <LowerLayout />
    </main>
  );
};

export default Home;
