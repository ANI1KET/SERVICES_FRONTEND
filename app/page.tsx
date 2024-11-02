import UpperLayout from "./components/HomeLayouts/UpperLayout";
import LowerLayout from "./components/HomeLayouts/LowerLayout";
import MiddleLayout from "./components/HomeLayouts/MiddleLayout";

const Home: React.FC = () => {
  return (
    <main>
      <UpperLayout />
      <MiddleLayout />
      <LowerLayout />
    </main>
  );
};

export default Home;
