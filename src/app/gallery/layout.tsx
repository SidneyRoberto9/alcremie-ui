import { Metadata } from 'next';

import { GalleryContextProvider } from '@/context/useGallery';
import { LayoutProps } from '@/app/layout';

export const metadata: Metadata = {
  title: 'Gallery | Alcremie',
  description: 'The Anime Image API',
};

export default function Layout({ children }: LayoutProps) {
  return <GalleryContextProvider>{children}</GalleryContextProvider>;
}
