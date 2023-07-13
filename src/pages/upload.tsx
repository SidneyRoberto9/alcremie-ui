import { NextSeo } from 'next-seo';

import { Content } from '../components/Content';
import { FormUpload } from '../components/upload/FormUpload';

export default function Upload() {
  return (
    <>
      <NextSeo title="Upload | Alcremie" />

      <Content>
        <FormUpload />
      </Content>
    </>
  );
}
