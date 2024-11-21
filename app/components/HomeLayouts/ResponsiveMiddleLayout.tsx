"use client";

import React, { useState, useEffect } from "react";
import MiddleLayout from "./MiddleLayout";

// const ResponsiveMiddleLayout: React.FC<{
//   upperComponent: React.ReactNode;
//   lowerComponent: React.ReactNode;
// }> = ({ upperComponent, lowerComponent }) => {
const ResponsiveMiddleLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="max-sm:hidden ">
      <MiddleLayout>
        {/* {upperComponent}
      <hr className="border-black" />
      {lowerComponent} */}
        {children}
      </MiddleLayout>
    </div>
  );
};

export default ResponsiveMiddleLayout;
