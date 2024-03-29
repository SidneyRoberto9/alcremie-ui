import { HTMLAttributes, FC } from 'react';
import Link from 'next/link';
import { LucideProps } from 'lucide-react';

interface SideNavItemProps extends HTMLAttributes<HTMLAnchorElement> {
  title: string;
  link: string;
  icon: FC<LucideProps>;
  isActive: boolean;
  closeDrawer: () => void;
}

export function SideNavItem({
  title,
  link,
  icon: Icon,
  isActive,
  closeDrawer,
  ...props
}: SideNavItemProps) {
  if (isActive) {
    return (
      <Link
        {...props}
        href={link}
        prefetch={false}
        onClick={closeDrawer}
        className="flex items-center gap-2 w-11/12 text-zinc-100 mx-3 p-2  bg-lucide-300 rounded-lg">
        <Icon size={24} />
        <p>{title}</p>
      </Link>
    );
  }

  return (
    <Link
      {...props}
      href={link}
      prefetch={false}
      onClick={closeDrawer}
      className="flex items-center gap-2 w-11/12 text-zinc-100 mx-3 p-2 transition-all duration-200 ease-in-out hover:bg-lucide-300 rounded-lg">
      <Icon size={24} />
      <p>{title}</p>
    </Link>
  );
}
