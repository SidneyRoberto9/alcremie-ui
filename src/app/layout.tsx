import '@/styles/globals.css';

import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import Favicon from '/public/favicon.ico';

import { Providers } from '@/component/Providers';
import { Header } from '@/component/Header';
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
      <body className="antialiased bg-lucide-600 text-zinc-100">
        <Providers>
          <Header />
          <SideNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
