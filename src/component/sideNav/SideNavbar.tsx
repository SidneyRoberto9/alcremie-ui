'use client';

import Drawer from 'react-modern-drawer';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Upload, Menu, Image, Home, AlertOctagon } from 'lucide-react';

import { useGallery } from '@/store/gallery';
import { SideNavItem } from '@/component/sideNav/SideNavItem';

export function SideNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="fixed top-2 left-2 inline-flex items-center peer justify-center rounded-md py-1 px-2 text-lucide-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lucide-300 hover:bg-lucide-800 group z-20">
        <Menu size={36} />
      </button>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="left">
        <div className="relative bg-lucide-600 h-full w-full">
          <X onClick={toggleDrawer} size={20} className="absolute top-2 right-2 cursor-pointer" />

          <div className="pt-14"></div>

          <div className="flex flex-col gap-2">
            <SideNavItem
              onClick={toggleDrawer}
              link="/"
              title="Home"
              icon={<Home size={24} />}
              isActive={pathname == '/'}
              closeDrawer={toggleDrawer}
            />
            <SideNavItem
              title="Gallery"
              link="/gallery"
              closeDrawer={toggleDrawer}
              icon={<Image size={24} />}
              isActive={pathname == '/gallery'}
            />
            <SideNavItem
              title="NSFW"
              link="/nsfw/validation"
              closeDrawer={toggleDrawer}
              icon={<AlertOctagon size={24} />}
              isActive={pathname == '/nsfw/validation' || pathname == '/nsfw'}
            />
            <SideNavItem
              title="Upload"
              link="/upload"
              closeDrawer={toggleDrawer}
              icon={<Upload size={24} />}
              isActive={pathname == '/upload'}
            />
            {/* 
             routes that did not enter
            <SideNavItem
              title="Tag"
              link="/tag"
              icon={<Tag size={24} />}
              closeDrawer={toggleDrawer}
              isActive={pathname == '/tag'}
            />
            <SideNavItem
              title="Docs"
              link="/docs"
              closeDrawer={toggleDrawer}
              isActive={pathname == '/docs'}
              icon={<BookMarked size={24} />}
            />
            <SideNavItem
              link="/contact"
              title="Contact Us"
              closeDrawer={toggleDrawer}
              icon={<PhoneCall size={24} />}
              isActive={pathname == '/contact'}
            />
            <SideNavItem
              title="Favorites"
              link="/favorites"
              closeDrawer={toggleDrawer}
              icon={<Heart size={24} />}
              isActive={pathname == '/favorites'}
            />
            <SideNavItem
              title="Tag Manager"
              link="/tag/manager"
              closeDrawer={toggleDrawer}
              icon={<AppWindow size={24} />}
              isActive={pathname == '/tag/manager'} 
            />*/}
          </div>
        </div>
      </Drawer>
    </>
  );
}
