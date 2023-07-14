import { NextSeo } from 'next-seo';

import { TagsTable } from '@/components/Manager/TagsTable';
import { Content } from '@/components/Content';

export default function Manager() {
  return (
    <>
      <NextSeo title="Tag Manager | Alcremie" />
      <Content m={'4rem'}>
        <TagsTable isAdmin />
      </Content>
    </>
  );
}
