import { Metadata } from 'next';

import RecentProvider from '@/components/recent/RecentProvider';
import { LayoutProps } from '@/app/layout';

export const metadata: Metadata = {
  title: 'Gallery | Alcremie',
  description: 'The Anime Image API',
};

export default function Layout({ children }: LayoutProps) {
  return <RecentProvider>{children}</RecentProvider>;
}
