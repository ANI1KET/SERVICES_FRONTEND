import { SearchBoxTabs } from "@/app/lib/utils/tabs";

const SearchPanel = () => {
  return (
    <section className="h-[15vh] grid grid-cols-3 place-items-center rounded-3xl border-2 border-black ">
      {SearchBoxTabs?.map(([label, content], index) => (
        <div key={index} className="">
          {label}
        </div>
      ))}
    </section>
  );
};

export default SearchPanel;
