import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { List } from 'phosphor-react';

import { useNav } from '../context/useNav';

export function Header() {
  const { isOpen, toggleNav } = useNav();

  function handleOpenNav() {
    toggleNav(!isOpen);
  }

  return (
    <Flex
      pos={'fixed'}
      zIndex={0}
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

      <Box p={'0.5rem'} margin={'0 1rem'}>
        <Image src="/logo.png" w={30} h={30} />
      </Box>
    </Flex>
  );
}
