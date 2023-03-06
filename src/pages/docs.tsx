import { NextSeo } from 'next-seo';

import { Content } from '../components/Content';
import { InProgressScreen } from '../components/Screens/InProgressScreen';

export default function Docs() {
  return (
    <>
      <NextSeo title="Docs | Alcremie" />

      <Content>
        <InProgressScreen />
      </Content>
    </>
  );
}
