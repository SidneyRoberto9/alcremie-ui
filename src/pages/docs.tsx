import { NextSeo } from 'next-seo';

import { InProgressScreen } from '../components/Screens/InProgressScreen';
import { Content } from '../components/Content';

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
