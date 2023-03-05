import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';

import { Content } from '../../components/Content';

export default function Manager() {
  return (
    <>
      <NextSeo title="Tag Manager | Alcremie" />

      <Content>
        <Box
          position={'absolute'}
          top={'50%'}
          left={'50%'}
          transform={'translate(-50%, -50%)'}
          width={{ base: '90%', md: '40%' }}
          bg={'gray.850'}
          borderRadius={'8px'}
        >
          casa
        </Box>
      </Content>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (session.user.isAdmin === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
