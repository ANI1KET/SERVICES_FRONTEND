import UpperLayout from "./components/HomeLayouts/UpperLayout";
import LowerLayout from "./components/HomeLayouts/LowerLayout";
import UpperSearchBox from "./components/HomeLayouts/MiddleLayout/UpperSearchBox";
import LowerSearchBox from "./components/HomeLayouts/MiddleLayout/LowerSearchBox";
import ResponsiveMiddleLayout from "./components/HomeLayouts/ResponsiveMiddleLayout";

const Home = () => {
  return (
    <main>
      <UpperLayout />
      <ResponsiveMiddleLayout>
        <UpperSearchBox />
        <hr className="border-black" />
        <LowerSearchBox />
      </ResponsiveMiddleLayout>
      {/* <ResponsiveMiddleLayout
        upperComponent={<UpperSearchBox />}
        lowerComponent={<LowerSearchBox />}
      />  */}
      <LowerLayout />
    </main>
  );
};

export default Home;
