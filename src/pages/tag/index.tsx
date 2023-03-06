import { Accordion, Box, Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { TagProps } from '../../@types/api/tag';
import { Content } from '../../components/Content';
import { CollapseItem } from '../../components/Tag/CollapseItem';
import { TagButton } from '../../components/Tag/TagButton';
import { TextTitle } from '../../components/TextTitle';
import { getAllTags } from '../../server/query/tag.query';

interface TagServerSideProps {
  sfw: TagProps[];
  nsfw: TagProps[];
}

export default function Tag({ sfw, nsfw }: TagServerSideProps) {
  return (
    <>
      <NextSeo title="Tag | Alcremie" />

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
          <Flex
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            padding={'1rem'}
          >
            <TextTitle>Tags</TextTitle>

            <Accordion
              w={'100%'}
              margin={'2rem'}
              borderColor={'gray.850'}
              allowToggle
            >
              <CollapseItem title="sfw">
                {sfw.map(({ name, description, id }) => (
                  <TagButton key={id} tag={name} tooltipLabel={description} />
                ))}
              </CollapseItem>
              <CollapseItem title="NSFW">
                {nsfw.map(({ name, description, id }) => (
                  <TagButton key={id} tag={name} tooltipLabel={description} />
                ))}
              </CollapseItem>
            </Accordion>
          </Flex>
        </Box>
      </Content>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tags = await getAllTags();
  const sfw = tags.filter((tag) => tag.is_nsfw === false);
  const nsfw = tags.filter((tag) => tag.is_nsfw === true);

  return {
    props: { sfw, nsfw },
  };
};
