import { NextSeo } from 'next-seo';

import { Content } from '../components/Content';
import { NotFoundScreen } from '../components/Screens/NotFoundScreen';

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
