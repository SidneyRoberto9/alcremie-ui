import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { TagProps } from '../@types/api/tag';
import { Content } from '../components/Content';
import { FormUpload } from '../components/upload/FormUpload';
import { getAllTags } from '../server/query/tag.query';

interface UploadProps {
  tagsData: TagProps[];
}

export default function Upload({ tagsData }: UploadProps) {
  return (
    <>
      <NextSeo title="Upload | Alcremie" />

      <Content>
        <FormUpload tags={tagsData} />
      </Content>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllTags();
  return {
    props: { tagsData: data },
  };
};
