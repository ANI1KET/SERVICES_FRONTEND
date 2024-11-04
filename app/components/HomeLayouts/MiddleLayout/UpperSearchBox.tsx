import SlideTabs from "@/app/lib/ui/tabNavigation";
import { SearchBoxTabs } from "@/app/lib/utils/tabs";

const UpperSearchBox = () => {
  return (
    <SlideTabs
      tabs={SearchBoxTabs}
      componentId="SearchTab"
      className="h-1/2 flex justify-around items-center "
      sliderClass="h-[4.5vh] rounded-full bg-black"
    />
  );
};

export default UpperSearchBox;

// interface UpperSearchBoxProps {
//   isTriggered?: boolean;
// }
// const UpperSearchBox: React.FC<UpperSearchBoxProps> = ({
//   isTriggered = false,
// }) => {
//   return (
//     </div>
//   );
// };

// const UpperSearchBox: React.FC<{ isTriggered?: boolean }> = ({
//   isTriggered = false,
// }) => {
//   return (
//   );
// };

// export default UpperSearchBox;
