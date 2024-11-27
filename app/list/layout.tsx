import type { Metadata } from "next";
import CategoryTabs from "../lib/ui/CategoryTabs";
import { categoryTabs } from "../lib/utils/tabs";

export const metadata: Metadata = {
  title: "SERVICES",
  description: "TO RENT ROOM",
  keywords: ["rent", "room", "accommodation"],
};

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid gap-2 max-sm:w-full w-[71vw] mx-[11.5vw] max-sm:mx-0 max-sm:p-2 pb-2">
      <CategoryTabs
        tabs={categoryTabs}
        componentId={`ListCategoryTab`}
        className={`p-1 grid grid-flow-col max-sm:grid-flow-row max-sm:grid-cols-3 place-items-center border-black border-2 rounded-xl`}
      />
      <div className="border-black border-2 rounded-xl p-2">{children}</div>
    </div>
  );
}
