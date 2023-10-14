import { Tag, Server, Image as IMG } from 'lucide-react';

import { api } from '@/lib/axios';
import { Hero } from '@/component/home/Hero';
import { Status } from '@/component/home/status/Index.ts';
import { StatusResponse, Image } from '@/@Types/Image';

async function getRandomImage() {
  const { data } = await api.get<Image>('random-image');

  return data;
}

async function getStatus() {
  const { data } = await api.get<StatusResponse>('status');

  return data.statistics;
}

export default async function Page() {
  const randomImage = await getRandomImage();
  const { image, tag, request } = await getStatus();

  return (
    <div>
      <Hero />
      <Status.root>
        <Status.image data={randomImage} />
        <Status.itemList>
          <Status.item value={image} title={'Tags'}>
            <Status.icon icon={Tag} />
          </Status.item>
          <Status.item value={tag} title={'Images'}>
            <Status.icon icon={IMG} />
          </Status.item>
          <Status.item value={request} title={'Requests'}>
            <Status.icon icon={Server} />
          </Status.item>
        </Status.itemList>
      </Status.root>
    </div>
  );
}
