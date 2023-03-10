import { Box, useMediaQuery } from '@chakra-ui/react';
import {
  AppWindow,
  BookBookmark,
  Heart,
  HouseLine,
  Image,
  Tag,
  UploadSimple,
} from 'phosphor-react';
import { slide as Menu } from 'react-burger-menu';

import { useNav } from '../../context/useNav';
import { NavLink } from './NavLink';

interface routesProps {
  path: string;
  icon: JSX.Element;
  label: string;
  name: string;
  isAdmin: boolean;
}

const routes: routesProps[] = [
  {
    path: '/',
    icon: <HouseLine size={35} />,
    name: 'home',
    label: 'Home',
    isAdmin: false,
  },
  {
    path: '/recent',
    icon: <Image size={35} />,
    label: 'Recent',
    name: 'recent',
    isAdmin: false,
  },
  {
    path: '/upload',
    icon: <UploadSimple size={35} />,
    label: 'Upload',
    name: 'upload',
    isAdmin: false,
  },
  {
    path: '/tag',
    icon: <Tag size={35} />,
    label: 'Tags',
    name: 'tag',
    isAdmin: false,
  },
  {
    path: '/docs',
    icon: <BookBookmark size={35} />,
    label: 'Docs',
    name: 'docs',
    isAdmin: false,
  },
  {
    path: '/favorites',
    icon: <Heart size={35} />,
    label: 'Favorites',
    name: 'favorites',
    isAdmin: true,
  },
  {
    path: '/tag/manager',
    icon: <AppWindow size={35} />,
    label: 'Tag Manager',
    name: 'manager',
    isAdmin: true,
  },
];

export function Nav() {
  const { toggleNav, isOpen } = useNav();

  const [isLessThan475] = useMediaQuery('(max-width: 475px)');

  return (
    <Box
      __css={{
        '.bm-item-list': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },

        '.bm-cross': {
          cursor: 'pointer',
          backgroundColor: 'gray.300',
        },

        '.bm-menu': {
          background: 'gray.850',
          padding: '0.3rem 0.3rem 0',
          fontSize: '1.15rem',
          WebkitBoxShadow: '9px 0px 5px -3px rgba(0,0,0,0.48)',
          MozBoxShadow: '9px 0px 5px -3px rgba(0,0,0,0.48)',
          boxShadow: '9px 0px 5px -3px rgba(0,0,0,0.48)',
        },

        '.bm-overlay': {
          background: 'rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Menu
        right={false}
        isOpen={isOpen}
        width={isLessThan475 ? '100vw' : '25rem'}
        customBurgerIcon={false}
        onStateChange={(state) => toggleNav(state.isOpen)}
      >
        <Box
          paddingTop={'3.75rem'}
          width={'100%'}
          display={'grid !important'}
          gridTemplateRows={'1fr'}
          gridGap={'0.5rem'}
        >
          {routes.map((route, index) => (
            <NavLink {...route} key={index} />
          ))}
        </Box>
      </Menu>
    </Box>
  );
}
