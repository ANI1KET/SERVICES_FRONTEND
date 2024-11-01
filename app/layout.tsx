import type { Metadata } from "next";
import "./globals.css";

import StoreProvider from "@/app/providers/storeProvider";
import AuthProvider from "./providers/authProvider";
import Header from "./header";
import MobileNavBar from "./MobileNavBar";
import Footer from "./footer";

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
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            <MobileNavBar />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
