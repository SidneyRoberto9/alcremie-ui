import { Box } from '@chakra-ui/react';
import Head from 'next/head';

import { FormUpload } from '../components/upload/FormUpload';

export default function Upload() {
  return (
    <>
      <Head>
        <title>Upload | Alcremie</title>
        <meta name="description" content="Upload Form" />
      </Head>

      <Box paddingTop={'3.75rem'} h={'100vh'}>
        <FormUpload />
      </Box>
    </>
  );
}
