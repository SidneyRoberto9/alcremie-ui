'use client';

import { QueryClientProvider, QueryClient } from 'react-query';
import { PhotoProvider } from 'react-photo-view';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PhotoProvider>{children}</PhotoProvider>
    </QueryClientProvider>
  );
}
