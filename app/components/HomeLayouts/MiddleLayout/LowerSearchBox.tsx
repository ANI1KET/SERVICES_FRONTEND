"use client";

import SearchForm from "@/app/lib/ui/SearchForm";
import useBreakpoint from "@/app/lib/utils/useBreakpoint";

const LowerSearchBox: React.FC = () => {
  const { isMobile } = useBreakpoint();
  return isMobile ? null : <SearchForm />;
};

export default LowerSearchBox;

// import React from "react";

// import SearchForm from "@/app/lib/ui/SearchForm";

// const SearchPanel = () => {
//   return <SearchForm />;
// };

// export default SearchPanel;
