import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';

import Footer from './components/Footer/footer';
import AuthProvider from './providers/authProvider';
import Header from './components/HeaderNavigationBar/header';
import ReactQueryProvider from './providers/reactqueryProvider';
// import DisableInteractions from "./lib/utils/DisableInteractions";
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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N3S708NG1H"
        ></Script>
        <Script id="Google_Analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-N3S708NG1H');
          `}
        </Script>
      </head>
      <body className="bg-green-100">
        {/* <body className="bg-neutral-800"> */}
        <ReactQueryProvider>
          <AuthProvider>
            {/* <DisableInteractions /> */}
            <Header />
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
