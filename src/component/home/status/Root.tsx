import { ReactNode } from 'react';

import { Container } from '@/component/Container';

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <Container className="lg:pt-32 lg:px-14 md:pt-20 pt-1 px-4">
      <div className="flex lg:flex-row flex-col items-center justify-between">{children}</div>
    </Container>
  );
}
