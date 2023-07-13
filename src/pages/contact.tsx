import { NextSeo } from 'next-seo';

import { Content } from '../components/Content';
import { FormContact } from '../components/Contact/formContact';

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
