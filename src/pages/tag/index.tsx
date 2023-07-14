import { NextSeo } from 'next-seo';

import { TagsTable } from '@/components/Manager/TagsTable';
import { Content } from '@/components/Content';

export default function Tag() {
  return (
    <>
      <NextSeo title="Tag | Alcremie" />

      <Content m={'4rem'}>
        <TagsTable />
      </Content>
    </>
  );
}
