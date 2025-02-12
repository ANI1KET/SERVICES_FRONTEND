import './globals.css';
import type { Metadata } from 'next';

import Footer from './components/Footer/footer';
import AuthProvider from './providers/authProvider';
import Header from './components/HeaderNavigationBar/header';
import ReactQueryProvider from './providers/reactqueryProvider';
// import DisableInteractions from "./lib/utils/DisableInteractions";
// import SideNavBar from "./components/SideNavigationBar/SideNavBar";
import BottomNavBar from './components/BottomNavigationBar/BottomNavBar';

export const metadata: Metadata = {
  title: 'Services Market Place',
  keywords: ['rent', 'room', 'accommodation'],
  description: 'Room, Land, Hostel, Store, Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-green-100">
        {/* <body className="bg-neutral-800"> */}
        <ReactQueryProvider>
          <AuthProvider>
            {/* <DisableInteractions /> */}
            <Header />
            {/* <SideNavBar /> */}
            {children}
            <Footer />
            <BottomNavBar />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

// import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/options';
// const session = await getServerSession(authOptions);
