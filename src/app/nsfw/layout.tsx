import { Metadata } from 'next';

import { NSFWContextProvider } from '@/context/nsfw';
import { LayoutProps } from '@/app/layout';

export const metadata: Metadata = {
  title: 'Gallery - NSFW | Alcremie',
  description: 'The Anime Image API',
};

export default function Layout({ children }: LayoutProps) {
  return <NSFWContextProvider>{children}</NSFWContextProvider>;
}
