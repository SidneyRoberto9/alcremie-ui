import { NextSeo } from 'next-seo';

import { InProgressScreen } from '@/components/Screens/InProgressScreen';
import { TagsTable } from '@/components/Manager/TagsTable';
import { Content } from '@/components/Content';

export default function Tag() {
  return (
    <>
      <NextSeo title="Tag | Alcremie" />

      <Content m={'4rem'}>
        <InProgressScreen />
        {/* <TagsTable /> */}
      </Content>
    </>
  );
}
