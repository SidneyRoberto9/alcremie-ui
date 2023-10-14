import { Metadata } from 'next';

import { UploadContextProvider } from '@/context/upload';
import { LayoutProps } from '@/app/layout';

export const metadata: Metadata = {
  title: 'Upload | Alcremie',
  description: 'The Anime Image API',
};

export default function Layout({ children }: LayoutProps) {
  return <UploadContextProvider>{children}</UploadContextProvider>;
}
