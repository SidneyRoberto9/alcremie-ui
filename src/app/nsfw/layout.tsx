import { Metadata } from 'next';

import NsfwProvider from '@/component/nsfw/NSFWProvider';
import { LayoutProps } from '@/app/layout';

export const metadata: Metadata = {
  title: 'Gallery - NSFW | Alcremie',
  description: 'The Anime Image API',
};

export default function Layout({ children }: LayoutProps) {
  return <NsfwProvider>{children}</NsfwProvider>;
}
