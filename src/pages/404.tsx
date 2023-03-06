import { NextSeo } from 'next-seo';

import { Content } from '../components/Content';
import { NotFound } from '../components/Screens/NotFound';

export default function Custom404() {
  return (
    <>
      <NextSeo title="Not Found | Alcremie" />

      <Content>
        <NotFound />
      </Content>
    </>
  );
}
