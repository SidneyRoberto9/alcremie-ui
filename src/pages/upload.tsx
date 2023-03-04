import { Box } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import { FormUpload } from '../components/upload/FormUpload';

export default function Upload() {
  return (
    <>
      <NextSeo title="Upload | Alcremie" />

      <Box paddingTop={'3.75rem'} h={'100vh'}>
        <FormUpload />
      </Box>
    </>
  );
}
