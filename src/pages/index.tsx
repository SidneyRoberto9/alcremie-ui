import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Alcremie</title>
        <meta name="description" content="Home page" />
      </Head>

      <Box paddingTop={'4.75rem'}>
        <a href="'/4040'">test</a>
      </Box>
    </>
  );
}
