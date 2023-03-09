import { Accordion, Flex, useMediaQuery } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { TagProps } from '../../@types/api/tag';
import { Absolute } from '../../components/Absolute';
import { Content } from '../../components/Content';
import { CollapseItem } from '../../components/Tag/CollapseItem';
import { TagButton } from '../../components/TagButton';
import { TextTitle } from '../../components/TextTitle';
import { getAllTags } from '../../server/query/tag.query';

interface TagServerSideProps {
  sfw: TagProps[];
  nsfw: TagProps[];
}

export default function Tag({ sfw, nsfw }: TagServerSideProps) {
  const [isLessThan680] = useMediaQuery('(max-width: 680px)');
  return (
    <>
      <NextSeo title="Tag | Alcremie" />

      <Content>
        <Absolute width={{ base: '95%', lg: '60%' }}>
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
                  <TagButton
                    key={id}
                    tag={name}
                    tooltipLabel={description}
                    size={isLessThan680 ? 'xs' : 'sm'}
                  />
                ))}
              </CollapseItem>
              <CollapseItem title="NSFW">
                {nsfw.map(({ name, description, id }) => (
                  <TagButton
                    key={id}
                    tag={name}
                    tooltipLabel={description}
                    size={isLessThan680 ? 'xs' : 'sm'}
                  />
                ))}
              </CollapseItem>
            </Accordion>
          </Flex>
        </Absolute>
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
