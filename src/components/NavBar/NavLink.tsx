import { Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useNav } from '../../context/useNav';

interface NavLinkProps {
  path: string;
  name: string;
  icon: JSX.Element;
  isAdmin: boolean;
}

export function NavLink({ path, name, icon, isAdmin }: NavLinkProps) {
  const { data, status } = useSession();

  const isSignedIn = status === 'authenticated';
  const isAdminUser = data?.user.isAdmin;

  const router = useRouter();
  const { toggleNav, isOpen } = useNav();

  function handleNavigate() {
    if (isOpen) {
      toggleNav(false);
    }

    router.push(path);
  }

  function onValidateRoutePath() {
    if (
      (router.pathname == '/' && name == 'home') ||
      router.pathname.includes(name)
    ) {
      return 'gray.500';
    }

    return 'transparent';
  }
  if (isAdmin) {
    return isAdminUser && isSignedIn ? (
      <Text
        onClick={handleNavigate}
        bg={onValidateRoutePath()}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        padding={'1.5rem 1rem'}
        margin={'0 1rem'}
        height={'2.3rem'}
        cursor={'pointer'}
        borderRadius={'8px'}
        transition={'backgroundColor 250ms ease-in-out'}
        textDecoration={'none'}
        textTransform={'capitalize'}
        color={'white.900'}
        _hover={{
          backgroundColor: 'gray.600',
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
    ) : null;
  }

  return (
    <Text
      onClick={handleNavigate}
      bg={onValidateRoutePath()}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      padding={'1.5rem 1rem'}
      margin={'0 1rem'}
      height={'2.3rem'}
      cursor={'pointer'}
      borderRadius={'8px'}
      transition={'backgroundColor 250ms ease-in-out'}
      textDecoration={'none'}
      textTransform={'capitalize'}
      color={'white.900'}
      _hover={{
        backgroundColor: 'gray.600',
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
