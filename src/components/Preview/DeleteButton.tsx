import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TrashSimple } from 'phosphor-react';

import { api } from '../../server/api';

interface DeleteButtonProps {
  imageId: string;
}

export function DeleteButton({ imageId }: DeleteButtonProps) {
  const router = useRouter();
  const toast = useToast();

  async function handleDelete() {
    try {
      await api.delete(`/img/delete/${imageId}`);
      router.back();
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'An error occurred while delete the image.',
        status: 'error',
        duration: 3500,
        isClosable: true,
      });
    }
  }

  return (
    <Tooltip
      hasArrow
      label={'Delete Image'}
      placement={'bottom'}
      bg={'white'}
      color={'gray.750'}
    >
      <Button onClick={handleDelete} variant={'delete'}>
        <TrashSimple size={26} weight={'duotone'} />
      </Button>
    </Tooltip>
  );
}
