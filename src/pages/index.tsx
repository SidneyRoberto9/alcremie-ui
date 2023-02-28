import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Alcremie</title>
        <meta name="description" content="Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box paddingTop={'4.75rem'}>
        <a href="'/4040'">test</a>
      </Box>
    </>
  );
}
