import { NextSeo } from 'next-seo';

import { InternalServerErrorScreen } from '../components/Screens/InternalServerErrorScreen';
import { Content } from '../components/Content';

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
