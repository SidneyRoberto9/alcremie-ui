import { ReactNode } from 'react';
import Link from 'next/link';

interface SideNavItemProps {
  title: string;
  link: string;
  icon: ReactNode;
  isActive: boolean;
  closeDrawer: () => void;
}

export function SideNavItem({ title, link, icon, isActive, closeDrawer }: SideNavItemProps) {
  if (isActive) {
    return (
      <Link
        href={link}
        prefetch={false}
        onClick={closeDrawer}
        className="flex items-center gap-2 w-11/12 text-zinc-100 mx-3 p-2  bg-lucide-300 rounded-lg">
        {icon}
        <p>{title}</p>
      </Link>
    );
  }

  return (
    <Link
      href={link}
      prefetch={false}
      onClick={closeDrawer}
      className="flex items-center gap-2 w-11/12 text-zinc-100 mx-3 p-2 transition-all duration-200 ease-in-out hover:bg-lucide-300 rounded-lg">
      {icon}
      <p>{title}</p>
    </Link>
  );
}
