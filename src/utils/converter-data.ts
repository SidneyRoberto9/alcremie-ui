import { Image } from '@prisma/client';

import { ImageDto } from '../@types/api/img';
import { Statistics, StatisticsDto } from '../@types/api/status';
import { TagProps } from '../@types/api/tag';

export function imageToDto(image: Image, tags: TagProps[]) {
  const imageDto: ImageDto = {
    id: image.id,
    isNsfw: image.isNsfw,
    source: image.source,
    imgurId: image.imgurId,
    imgurDeleteHash: image.imgurDeleteHash,
    imgurUrl: image.imgurUrl,
    tags: tags.sort((a, b) => a.name.localeCompare(b.name)),
  };

  return imageDto;
}

export function imageToDtoWithoutTags(images: Image) {
  const imageDto: Omit<ImageDto, 'tags'> = {
    id: images.id,
    isNsfw: images.isNsfw,
    source: images.source,
    imgurId: images.imgurId,
    imgurDeleteHash: images.imgurDeleteHash,
    imgurUrl: images.imgurUrl,
  };

  return imageDto;
}

export function statisticsToDto(data: Statistics) {
  const statisticDto: StatisticsDto = {
    tags: data.totalTags,
    images: data.totalImages,
    requests: data.totalRequests,
  };

  return statisticDto;
}
