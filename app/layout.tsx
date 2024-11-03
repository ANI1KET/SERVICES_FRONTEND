import type { Metadata } from "next";
import "./globals.css";

import StoreProvider from "@/app/providers/storeProvider";
import AuthProvider from "./providers/authProvider";
import Header from "./components/HeaderNavigationBar/header";
import BottomNavBar from "./components/BottomNavigationBar/BottomNavBar";
import Footer from "./components/Footer/footer";
import SideNavBar from "./components/SideNavigationBar/SideNavBar";

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
            <SideNavBar />
            {children}
            <Footer />
            <BottomNavBar />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
