import { NextSeo } from 'next-seo';

import { Content } from '../components/Content';
import { InternalServerErrorScreen } from '../components/Screens/InternalServerErrorScreen';

export default function Custom500() {
  return (
    <>
      <NextSeo title="Internal Server Error | Alcremie" />

      <Content>
        <InternalServerErrorScreen />
      </Content>
    </>
  );
}
