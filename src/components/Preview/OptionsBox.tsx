import { Box, BoxProps, Button } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { DeleteButton } from './DeleteButton';
import { FavoriteButton } from './FavoriteButton';

interface OptionsBoxProps extends BoxProps {
  url: string;
  name: string;
  source: string;
  deleteHashImageId: string;
  handleEdit: () => void;
}

export function OptionsBox({
  url,
  name,
  source,
  deleteHashImageId,
  handleEdit,
  ...rest
}: OptionsBoxProps) {
  const { data, status } = useSession();
  const router = useRouter();

  const actualUserIsAuthenticated = status === 'authenticated';
  const actualUserIsAdmin = actualUserIsAuthenticated && data?.user?.isAdmin;
  const sourceUrlExists = source.includes('http');

  function handleDownload() {
    saveAs(url, name + '.png');
  }

  function handleOpenSource() {
    window.open(source, '_blank');
  }

  return (
    <Box {...rest}>
      <Box p={'0 1rem'} border={'1px solid gray.200'} gap={'1rem'}>
        <Button onClick={handleDownload} variant={'primary'} m={'0.25rem'}>
          Download
        </Button>

        {actualUserIsAdmin && (
          <Button onClick={handleEdit} variant={'danger'} m={'0.25rem'}>
            Editor
          </Button>
        )}

        {sourceUrlExists && (
          <Button
            onClick={handleOpenSource}
            variant={'solid'}
            colorScheme={'twitter'}
            m={'0.25rem'}
          >
            Source
          </Button>
        )}

        {actualUserIsAdmin && <DeleteButton imageId={deleteHashImageId} />}

        {actualUserIsAuthenticated && (
          <FavoriteButton
            imageId={String(router.query.id)}
            userId={String(data?.user.id)}
          />
        )}
      </Box>
    </Box>
  );
}
