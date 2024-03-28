import { Metadata } from 'next';

import { LayoutProps } from '@/app/layout';
import { UploadContextProvider } from '@/context/useUpload';

export const metadata: Metadata = {
  title: 'Upload | Alcremie',
  description: 'The Anime Image API',
};

export default function Layout({ children }: LayoutProps) {
  return <UploadContextProvider>{children}</UploadContextProvider>;
}
