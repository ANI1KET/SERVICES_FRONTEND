import { SearchBoxTabs } from "@/app/lib/utils/tabs";

const SearchPanel = () => {
  return (
    <section className="h-[15vh] grid grid-cols-3 place-items-center rounded-3xl border-2 border-black ">
      {/* {SearchBoxTabs?.map(([label, content], index) => (
        <nav>{label}</nav>
      ))} */}
      <div className="">Room</div>
      <div className="">Flat</div>
      <div className="">Hostel</div>
      <div className="">Restaturent</div>
      <div className="">Land</div>
      <div className="">Book</div>
      <div className="">Car</div>
    </section>
  );
};

export default SearchPanel;
