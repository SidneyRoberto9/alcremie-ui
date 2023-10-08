'use client';
import { Tag, Server, Image } from 'lucide-react';

import { useHome } from '@/store/home';
import { Container } from '@/components/Container';
import { StatisticItem } from '@/components/home/StatisticItem';
import { RandomImage } from '@/components/home/RandomImage';

export function Statistics() {
  const { statistics } = useHome();
  return (
    <Container className="lg:pt-32 lg:px-14 md:pt-20 pt-1 px-4">
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <div className="h-[70vh] my-10 mx-2">
          <RandomImage />
        </div>
        <div className="grid grid-col-1 w-[400px]">
          <StatisticItem icon={<Tag size={80} />} value={statistics.tag} title={'Tags'} />
          <StatisticItem icon={<Image size={80} />} value={statistics.image} title={'Images'} />
          <StatisticItem
            icon={<Server size={80} />}
            value={statistics.request}
            title={'Requests'}
          />
        </div>
      </div>
    </Container>
  );
}
