import type { Metadata } from "next";
import "./globals.css";

import StoreProvider from "@/app/providers/storeProvider";
import AuthProvider from "./providers/authProvider";

export const metadata: Metadata = {
  title: "ROOM RENTAL",
  description: "TO RENT ROOM",
  keywords: ["rent", "room", "accommodation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthProvider>{children}</AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
