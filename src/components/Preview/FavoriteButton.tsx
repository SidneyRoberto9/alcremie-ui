import { Button, Tooltip } from '@chakra-ui/react';
import { Heart } from 'phosphor-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { api } from '../../server/api';

interface FavoriteImageData {
  userId: string;
  imageId: string;
}

interface FavoriteButtonProps extends FavoriteImageData {}

export function FavoriteButton({ imageId, userId }: FavoriteButtonProps) {
  const { invalidateQueries } = useQueryClient();
  const queryIdentifier = ['img/fav', userId, imageId];
  const {
    data: isFavorite,
    isLoading,
    isFetching,
  } = useQuery(queryIdentifier, async () => {
    const response = await api.get<boolean>(`/img/fav/${userId}/${imageId}`);
    return response.data;
  });

  const { mutateAsync, isLoading: isLoadingMutation } = useMutation(
    async (data: FavoriteImageData) => {
      const response = await api.post(`/img/fav`, {
        userId: data.userId,
        imageId: data.imageId,
      });

      return response.data;
    },
    {
      onSuccess: () => {
        invalidateQueries(queryIdentifier);
      },
    },
  );

  async function handleFavoriteStatus() {
    await mutateAsync({ userId, imageId });
  }

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
        isLoading={isLoading || isFetching || isLoadingMutation}
        variant={isFavorite ? 'favorite' : 'notFavorite'}
        width={'4rem'}
        p={'0'}
      >
        <Heart size={25} weight="fill" />
      </Button>
    </Tooltip>
  );
}
