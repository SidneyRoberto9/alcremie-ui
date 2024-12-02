import '@/styles/globals.css';
import 'react-modern-drawer/dist/index.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-toastify/dist/ReactToastify.css';

import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Favicon from '/public/favicon.ico';

import { Analytics } from '@/component/Analytics';
import { Header } from '@/component/Header';
import { Providers } from '@/component/Providers';
import { SideNavbar } from '@/component/sideNav/SideNavbar';

import type { Metadata } from 'next';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Home | Alcremie',
  description: 'The Anime Image API',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <Analytics />
      </head>
      <body className="antialiased bg-lucide-600 text-zinc-100">
        <Providers>
          <Header />
          <SideNavbar />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
