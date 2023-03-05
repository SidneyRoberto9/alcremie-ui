import { Box } from '@chakra-ui/react';
import { HouseLine, Image, Tag, UploadSimple } from 'phosphor-react';
import { slide as Menu } from 'react-burger-menu';

import { useNav } from '../../context/useNav';
import { NavLink } from './NavLink';

interface routesProps {
  path: string;
  icon: JSX.Element;
  name: string;
}

const routes: routesProps[] = [
  {
    path: '/',
    icon: <HouseLine size={35} />,
    name: 'home',
  },
  {
    path: '/recent',
    icon: <Image size={35} />,
    name: 'recent',
  },
  {
    path: '/upload',
    icon: <UploadSimple size={35} />,
    name: 'upload',
  },
  {
    path: '/tag',
    icon: <Tag size={35} />,
    name: 'tag',
  },
];

export function Nav() {
  const { toggleNav, isOpen } = useNav();

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
        width={'25rem'}
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
