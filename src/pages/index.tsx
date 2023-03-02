import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { StatisticsData } from '../@types/api/status';
import { MainHome } from '../components/Home/MainHome';
import { Statistics } from '../components/Home/Statistics';
import { statisticsToDto } from '../utils/converter-data';
import { getRandomImage } from '../utils/image-query';
import { getStatistics } from '../utils/statistic-query';

interface HomeProps {
  randomImage: string;
  statistics: StatisticsData;
}

export default function Home({ randomImage, statistics }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Alcremie</title>
        <meta name="description" content="Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box
        paddingTop={'8rem'}
        marginX={'auto'}
        paddingX={'3.75rem'}
        maxW={'1240px'}
      >
        <MainHome image={randomImage} />
        <Statistics data={statistics} />
      </Box>
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
