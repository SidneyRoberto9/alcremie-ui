import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { Link as ChakraUILink, Box } from '@chakra-ui/react';

interface MasonryItemProps {
  id: string;
  url: string;
}

export function MasonryItem({ id, url }: MasonryItemProps) {
  const router = useRouter();

  function handleOpenNewTab() {
    router.push(`preview/${id}`);
  }

  return (
    <ChakraUILink as={Link} href={`preview/${id}`} prefetch={false}>
      <Box w={'100%'} h={'100%'} position={'relative'} cursor={'pointer'} display={'block'}>
        <Image
          alt={id}
          src={url}
          onClick={handleOpenNewTab}
          width={1920}
          height={1080}
          quality={60}
          placeholder={'empty'}
        />
      </Box>
    </ChakraUILink>
  );
}
