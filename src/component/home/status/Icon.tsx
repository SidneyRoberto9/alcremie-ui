import { FC } from 'react';
import { LucideProps } from 'lucide-react';

interface IconProps {
  icon: FC<LucideProps>;
}

export function Icon({ icon: Icon }: IconProps) {
  return <Icon size={80} />;
}
