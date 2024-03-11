import { Image as IMG, Server, Tag } from 'lucide-react';
import { Fragment } from 'react';

import { Image, StatusResponse } from '@/@Types/Image';
import { Hero } from '@/component/home/Hero';
import { Status } from '@/component/home/status/Index.ts';
import { api } from '@/lib/axios';

export const dynamic = 'force-dynamic';

async function getData() {
  const [responseStatus, responseRandomImage] = await Promise.all([
    api.get<StatusResponse>('status'),
    api.get<Image>('random-image'),
  ]);

  return {
    status: responseStatus.data.statistics,
    randomImage: responseRandomImage.data,
  };
}

export default async function Page() {
  const {
    randomImage,
    status: { image, tag, request },
  } = await getData();

  return (
    <Fragment>
      <Hero />
      <Status.root>
        <Status.image data={randomImage} />
        <Status.itemList>
          <Status.item value={tag} title={'Tags'}>
            <Status.icon icon={Tag} />
          </Status.item>
          <Status.item value={image} title={'Images'}>
            <Status.icon icon={IMG} />
          </Status.item>
          <Status.item value={request} title={'Requests'}>
            <Status.icon icon={Server} />
          </Status.item>
        </Status.itemList>
      </Status.root>
    </Fragment>
  );
}
