import { NextSeo } from 'next-seo';

import { NotFoundScreen } from '../components/Screens/NotFoundScreen';
import { Content } from '../components/Content';

export default function Custom404() {
  return (
    <>
      <NextSeo title="Not Found | Alcremie" />

      <Content>
        <NotFoundScreen />
      </Content>
    </>
  );
}
