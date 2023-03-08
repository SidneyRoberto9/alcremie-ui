import { Box, Button, Flex } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { List } from 'phosphor-react';

import { useNav } from '../../context/useNav';
import { Avatar } from './Avatar';
import { FavoriteButton } from './FavoriteButton';
import { FilterTags } from './FilterTags';

export function Header() {
  const { isOpen, toggleNav } = useNav();
  const { data, status } = useSession();

  const router = useRouter();

  const isSignedIn = status === 'authenticated';
  const isSessionLoading = status === 'loading';
  const isPreviewPage = router.pathname.includes('preview');
  const isRecentPage = router.pathname.includes('recent');
  const isRecentPageWithSearch = router.query.include_tags !== undefined;

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
      <Flex gap={2} margin={'0 0.12rem'}>
        <Button
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          p={'0.5rem'}
          margin={'0.46rem 1rem'}
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
      </Flex>

      <Flex gap={2} margin={'0 0.12rem'}>
        <Box p={'0.7rem'} hidden={isSessionLoading}>
          {isSignedIn ? (
            <Avatar src={data?.user.avatar_url || '/logo.png'} />
          ) : (
            <Avatar src="/logo.png" />
          )}
        </Box>

        {isRecentPage && !isRecentPageWithSearch && <FilterTags />}

        {isSignedIn && isPreviewPage && (
          <FavoriteButton
            imageId={String(router.query.id)}
            userId={String(data?.user.id)}
          />
        )}

        <Button
          onClick={isSignedIn ? handleLogout : handleLogin}
          variant={'outline'}
          colorScheme={'green'}
          mr={'2rem'}
          my={'0.3rem'}
          borderWidth={'2px'}
          isLoading={isSessionLoading}
        >
          {isSignedIn ? 'Logout' : 'Login'}
        </Button>
      </Flex>
    </Flex>
  );
}
