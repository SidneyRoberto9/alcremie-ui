import { Metadata } from 'next';

import { LayoutProps } from '@/app/layout';

export const metadata: Metadata = {
  title: 'Upload | Alcremie',
  description: 'The Anime Image API',
};

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
