import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { StatisticsData } from '../@types/api/status';
import { Content } from '../components/Content';
import { MainHome } from '../components/Home/MainHome';
import { Statistics } from '../components/Home/Statistics';
import { getRandomImage } from '../server/query/image.query';
import { getStatistics } from '../server/query/statistic.query';
import { statisticsToDto } from '../utils/converter-data';

interface RandomImageData {
  id: string;
  image: string;
}
interface HomeProps {
  randomImage: RandomImageData;
  statistics: StatisticsData;
}

export default function Home({ randomImage, statistics }: HomeProps) {
  return (
    <>
      <NextSeo title="Home | Alcremie" />

      <Content
        paddingTop={'8rem'}
        marginX={'auto'}
        paddingX={'3.75rem'}
        maxW={'1240px'}
      >
        <MainHome image={randomImage.image} imageId={randomImage.id} />
        <Statistics data={statistics} />
      </Content>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const randomImage = await getRandomImage();
  const statistics = await getStatistics();

  if (!statistics) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      randomImage: randomImage,
      statistics: statisticsToDto(statistics),
    },
  };
};
