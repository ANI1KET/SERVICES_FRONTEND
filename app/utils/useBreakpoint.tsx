"use client";

import { useMediaQuery } from "@mui/material";

const breakpoints = {
  mobile: "(max-width:680px)",
  laptop: "(min-width:681px) and (max-width:1024px)",
  desktop: "(min-width:1025px)",
};

const useBreakpoint = () => {
  const isMobile = useMediaQuery(breakpoints.mobile);
  const isLaptop = useMediaQuery(breakpoints.laptop);
  const isDesktop = useMediaQuery(breakpoints.desktop);

  return { isMobile, isLaptop, isDesktop };
};

export default useBreakpoint;
