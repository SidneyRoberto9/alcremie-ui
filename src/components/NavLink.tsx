import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useNav } from '../context/useNav';

interface NavLinkProps {
  path: string;
  name: string;
  icon: JSX.Element;
}

export function NavLink({ path, name, icon }: NavLinkProps) {
  const router = useRouter();
  const { toggleNav, isOpen } = useNav();

  function handleNavigate() {
    if (isOpen) {
      toggleNav(false);
    }

    router.push(path);
  }

  return (
    <Text
      onClick={handleNavigate}
      bg={router.pathname.includes(name) ? 'gray.600' : 'transparent'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      padding={'0.5rem 1rem'}
      margin={'0 1rem'}
      height={'2.3rem'}
      cursor={'pointer'}
      borderRadius={'8px'}
      transition={'backgroundColor 250ms ease-in-out'}
      textDecoration={'none'}
      textTransform={'capitalize'}
      color={'white.900'}
      _hover={{
        backgroundColor: 'gray.400',
        opacity: 0.8,
      }}
      css={{
        svg: {
          fontSize: '1.5rem',
          paddingRight: '0.5rem',
        },
      }}
    >
      {icon}
      {name}
    </Text>
  );
}
