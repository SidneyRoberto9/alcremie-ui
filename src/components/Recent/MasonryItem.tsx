import { Box, Link } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
    <Link target={'_self'} href={`preview/${id}`}>
      <Box
        w={'100%'}
        h={'100%'}
        position={'relative'}
        cursor={'pointer'}
        display={'block'}
      >
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
    </Link>
  );
}
