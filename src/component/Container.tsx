import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export function Container({ className = '', children }: ContainerProps) {
  return <article className={cn('h-screen pt-3 mx-auto max-w-7xl', className)}>{children}</article>;
}
