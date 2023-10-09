import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export function Box({ className = '', children }: ContainerProps) {
  return <article className={cn('mt-16 relative', className)}>{children}</article>;
}
