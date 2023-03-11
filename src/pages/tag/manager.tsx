import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Tag } from '../../@types/api/tag';
import { Content } from '../../components/Content';
import { AddModal } from '../../components/Manager/AddModal';
import { DeleteModal } from '../../components/Manager/DeleteModal';
import { TableTags } from '../../components/Manager/TableTags';
import { tagsContext } from '../../context/useTags';
import { getAllTags } from '../../server/query/tag.query';

interface ManagerProps {
  tags: Tag[];
}

export default function Manager({ tags }: ManagerProps) {
  const { filterTag, setTags, data } = useContextSelector(
    tagsContext,
    ({ data, filterTag, setTags }) => ({
      data,
      filterTag,
      setTags,
    }),
  );
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [tagId, setTagId] = useState<string | null>(null);
  const [isLessThan680] = useMediaQuery('(max-width: 680px)');

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const search = e.target.value.toLowerCase();
    filterTag(search);
  }

  function onDelete(id: string) {
    setTagId(id);
    onOpenDelete();
  }

  useEffect(() => {
    setTags(tags);
  }, []);

  return (
    <>
      <NextSeo title="Tag Manager | Alcremie" />
      <AddModal isOpen={isOpenAdd} onClose={onCloseAdd} />
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        tagId={String(tagId)}
      />

      <Content>
        <Flex
          w={'100%'}
          padding={'3rem'}
          gap={'2rem'}
          align={'center'}
          justifyContent={'space-between'}
        >
          {isLessThan680 ? (
            <FormControl mt={'-2rem'}>
              <FormLabel fontWeight={'bold'}>Search</FormLabel>
              <Input
                type="text"
                _focusVisible={{
                  borderColor: 'green.300',
                }}
                placeholder="Search for a tag..."
                onChange={handleSearch}
              />
            </FormControl>
          ) : (
            <InputGroup>
              <InputLeftAddon
                children="Search"
                color={'black'}
                fontWeight={'bold'}
              />
              <Input
                type="text"
                _focusVisible={{
                  borderColor: 'green.300',
                }}
                placeholder="Search for a tag..."
                onChange={handleSearch}
              />
            </InputGroup>
          )}

          <Button variant={'default'} p={'0 2rem'} onClick={onOpenAdd}>
            Add Tag
          </Button>
        </Flex>

        <TableTags data={data} onOpen={onDelete} />
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

  const tags = await getAllTags();

  return {
    props: {
      tags,
    },
  };
};
