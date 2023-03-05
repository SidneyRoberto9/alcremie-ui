import { Box, Button, Flex } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { List } from 'phosphor-react';

import { useNav } from '../../context/useNav';
import { Avatar } from './Avatar';

export function Header() {
  const { isOpen, toggleNav } = useNav();
  const { data, status } = useSession();

  const isSignedIn = status === 'authenticated';
  const isSessionLoading = status === 'loading';

  console.log();
  //const router = useRouter();
  //console.log(router.query);

  async function handleLogin() {
    await signIn('google');
  }

  async function handleLogout() {
    await signOut();
  }

  function handleOpenNav() {
    toggleNav(!isOpen);
  }

  return (
    <Flex
      pos={'fixed'}
      zIndex={10}
      top={0}
      width={'100vw'}
      height={'3.75rem'}
      bg={'gray.850'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Button
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        p={'0.5rem'}
        margin={'0 1rem'}
        cursor={'pointer'}
        border={'2px solid gray.500'}
        bg={'gray.600'}
        borderRadius={'4px'}
        transition={'filter 250ms ease-in-out'}
        _hover={{
          filter: 'brightness(0.8)',
        }}
        _active={{
          filter: 'brightness(0.8)',
        }}
        onClick={handleOpenNav}
      >
        <List size={30} weight="regular" />
      </Button>

      <Flex gap={2} margin={'0 0.12rem'}>
        <Box p={'0.7rem'} hidden={isSessionLoading}>
          {isSignedIn ? (
            <Avatar src={data?.user.avatar_url || '/logo.png'} />
          ) : (
            <Avatar src="/logo.png" />
          )}
        </Box>

        <Button
          onClick={isSignedIn ? handleLogout : handleLogin}
          variant={'outline'}
          colorScheme={'green'}
          mr={'2rem'}
          my={'0.3rem'}
          isLoading={isSessionLoading}
        >
          {isSignedIn ? 'Logout' : 'Login'}
        </Button>
      </Flex>
    </Flex>
  );
}
