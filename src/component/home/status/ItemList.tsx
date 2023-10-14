import { ReactNode } from 'react';

interface ItemListProps {
  children: ReactNode;
}

export function ItemList({ children }: ItemListProps) {
  return <div className="grid grid-col-1 w-[400px]">{children}</div>;
}
