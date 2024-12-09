import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";

export default function App({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
