import { Box, BoxProps, Button } from '@chakra-ui/react';
import { saveAs } from 'file-saver';

interface OptionsBoxProps extends BoxProps {
  url: string;
  name: string;
}

export function OptionsBox({ url, name, ...rest }: OptionsBoxProps) {
  function handleDownload() {
    saveAs(url, name + '.png');
  }

  return (
    <Box {...rest}>
      <Box p={'0 1rem'} border={'1px solid gray.200'}>
        <Button onClick={handleDownload} variant={'default'}>
          Download
        </Button>
      </Box>
    </Box>
  );
}
