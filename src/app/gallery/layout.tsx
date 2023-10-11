import { Metadata } from 'next';

import GalleryProvider from '@/component/gallery/GalleryProvider';
import { LayoutProps } from '@/app/layout';

export const metadata: Metadata = {
  title: 'Gallery | Alcremie',
  description: 'The Anime Image API',
};

export default function Layout({ children }: LayoutProps) {
  return <GalleryProvider>{children}</GalleryProvider>;
}
