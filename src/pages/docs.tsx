import { NextSeo } from 'next-seo';

import { Content } from '../components/Content';
import { InProgress } from '../components/InProgress';

export default function Docs() {
  return (
    <>
      <NextSeo title="Docs | Alcremie" />

      <Content>
        <InProgress />
      </Content>
    </>
  );
}
