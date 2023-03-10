import { NextSeo } from 'next-seo';

import { FormContact } from '../components/Contact/formContact';
import { Content } from '../components/Content';

export default function Contact() {
  return (
    <>
      <NextSeo title="Contact | Alcremie" />

      <Content>
        <FormContact />
      </Content>
    </>
  );
}
