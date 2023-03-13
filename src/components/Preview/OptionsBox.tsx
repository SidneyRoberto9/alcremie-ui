import { Box, BoxProps, Button } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { useSession } from 'next-auth/react';

interface OptionsBoxProps extends BoxProps {
  url: string;
  name: string;
  handleEdit: () => void;
}

interface ButtonOptions {
  variant: 'primary' | 'danger';
  handle: () => void;
  label: string;
  isAdmin: boolean;
}

export function OptionsBox({
  url,
  name,
  handleEdit,
  ...rest
}: OptionsBoxProps) {
  const { data, status } = useSession();
  const actualUserIsAdmin = status === 'authenticated' && data?.user?.isAdmin;

  function handleDownload() {
    saveAs(url, name + '.png');
  }

  const options: ButtonOptions[] = [
    {
      variant: 'primary',
      handle: handleDownload,
      label: 'Download',
      isAdmin: false,
    },
    {
      variant: 'danger',
      handle: handleEdit,
      label: 'Edit',
      isAdmin: true,
    },
  ];

  return (
    <Box {...rest}>
      <Box p={'0 1rem'} border={'1px solid gray.200'} gap={'1rem'}>
        {options.map(({ variant, handle, label, isAdmin }) =>
          isAdmin ? (
            actualUserIsAdmin ? (
              <Button
                key={label}
                onClick={handle}
                variant={variant}
                m={'0.25rem'}
              >
                {label}
              </Button>
            ) : null
          ) : (
            <Button
              key={label}
              onClick={handle}
              variant={variant}
              m={'0.25rem'}
            >
              {label}
            </Button>
          ),
        )}
      </Box>
    </Box>
  );
}
