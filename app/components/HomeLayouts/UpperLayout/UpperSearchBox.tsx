const UpperSearchBox = () => {
  return (
    <div className="h-1/2 flex justify-around items-center">
      <div className="">Rent</div>
      <div className="">Hostel</div>
      <div className="">Car</div>
      <div className="">Book</div>
    </div>
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
//     <div className="h-12 flex justify-around items-center">
//       <div className="">Rent</div>
//       <div className="">Hostel</div>
//       <div className="">Car</div>
//       <div className="">Book</div>
//     </div>
//   );
// };

// const UpperSearchBox: React.FC<{ isTriggered?: boolean }> = ({
//   isTriggered = false,
// }) => {
//   return (
//     <div className="h-12 flex justify-around items-center">
//       <div className="">Rent</div>
//       <div className="">Hostel</div>
//       <div className="">Car</div>
//       <div className="">Book</div>
//     </div>
//   );
// };

// export default UpperSearchBox;
