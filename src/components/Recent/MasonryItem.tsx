import { Image } from '@chakra-ui/react';
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
    <Image
      width={'100%'}
      display={'block'}
      loading={'lazy'}
      fit={'cover'}
      cursor={'pointer'}
      alt={id}
      src={url}
      onClick={handleOpenNewTab}
    />
  );
}
