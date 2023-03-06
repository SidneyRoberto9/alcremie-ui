import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useEffect, useState } from 'react';

import { Content } from '../../components/Content';
import { TableTags } from '../../components/Manager';
import { AddModal } from '../../components/Manager/AddModal';
import { useTags } from '../../context/useTags';

export default function Manager() {
  const { getTags, data, filterTag } = useTags();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const search = e.target.value.toLowerCase();

    filterTag(search);
  }

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <NextSeo title="Tag Manager | Alcremie" />
      <AddModal isOpen={isOpen} onClose={onClose} />

      <Content>
        <Flex
          w={'100%'}
          padding={'3rem'}
          gap={'25rem'}
          align={'center'}
          justifyContent={'space-between'}
        >
          <InputGroup>
            <InputLeftAddon
              children="Search"
              color={'black'}
              fontWeight={'bold'}
            />
            <Input
              type="text"
              placeholder="Search for a tag..."
              onChange={handleSearch}
            />
          </InputGroup>

          <Button variant={'default'} p={'0 2rem'} onClick={onOpen}>
            Add Tag
          </Button>
        </Flex>

        <TableTags data={data} />
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
