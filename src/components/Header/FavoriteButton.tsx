import { Button, Tooltip } from '@chakra-ui/react';
import { Heart } from 'phosphor-react';
import { useEffect, useState } from 'react';

import { api } from '../../server/api';

interface FavoriteButtonProps {
  userId: string;
  imageId: string;
}

export function FavoriteButton({ imageId, userId }: FavoriteButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  async function onImageIsFavorite() {
    const { data } = await api.get(`/img/fav/${userId}/${imageId}`);

    setIsFavorite(data);
    setIsLoading(false);
  }

  async function handleFavoriteStatus() {
    setIsLoading(true);
    const { data } = await api.post(`/img/fav`, {
      userId,
      imageId,
    });

    setIsFavorite(data);
    setIsLoading(false);
  }

  useEffect(() => {
    onImageIsFavorite();
  }, []);

  return (
    <Tooltip
      hasArrow
      label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      placement={'bottom'}
      bg={'white'}
      color={'gray.750'}
    >
      <Button
        onClick={handleFavoriteStatus}
        isLoading={isLoading}
        m={'0.3rem'}
        ml={0}
        variant={'outline'}
        borderRadius={'full'}
        borderWidth={'2px'}
        p={0}
        width={'2.5rem'}
        pt={'0.1rem'}
        colorScheme={isFavorite ? 'whiteAlpha' : 'pink'}
        transition={'all 250ms ease-in-out'}
        _hover={{
          filter: 'brightness(0.75)',
        }}
      >
        <Heart size={25} weight="fill" />
      </Button>
    </Tooltip>
  );
}
