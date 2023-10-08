import '@/styles/globals.css';

import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';

import { Providers } from '@/components/Providers';
import { Header } from '@/components/header/Header';

import type { Metadata } from 'next';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Home | Alcremie',
  description: 'The Anime Image API',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="antialiased bg-lucide-600 text-zinc-100">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
