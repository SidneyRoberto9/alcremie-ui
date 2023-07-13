import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';

import { statisticsToDto } from '../utils/converter-data';
import { getStatistics } from '../server/query/statistic.query';
import { getRandomImage } from '../server/query/image.query';
import { Statistics } from '../components/Home/Statistics';
import { MainHome } from '../components/Home/MainHome';
import { Content } from '../components/Content';
import { StatisticsData } from '../@types/api/status';

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
        paddingTop={{ base: '5rem', lg: '8rem' }}
        marginX={'auto'}
        paddingX={{ base: '1rem', lg: '3.75rem' }}
        maxW={'1240px'}>
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
