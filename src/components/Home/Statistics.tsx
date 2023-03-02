import { Divider, Flex, Text } from '@chakra-ui/react';
import { HardDrives, Image, Tag } from 'phosphor-react';

import { StatisticsData } from '../../@types/api/status';
import { StatisticItem } from './StatisticsItem';

interface StatisticsProps {
  data: StatisticsData;
}

export function Statistics({ data }: StatisticsProps) {
  const { tags, requests, images } = data;

  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      py={'1.5rem'}
      flexDirection={'column'}
    >
      <Text fontSize={'2.5rem'} color={'white'}>
        Statistics
      </Text>
      <Divider orientation="horizontal" />
      <Flex alignItems={'center'} justifyContent={'space-around'} w={'100%'}>
        <StatisticItem icon={<Tag size={92} />} number={tags} name={'Tags'} />
        <StatisticItem
          icon={<HardDrives size={92} />}
          number={requests}
          name={'Requests'}
        />
        <StatisticItem
          icon={<Image size={92} />}
          number={images}
          name={'Images'}
        />
      </Flex>
    </Flex>
  );
}
