import { Image } from '@prisma/client';

import { ImageDto, ImageDtoWithTags } from '../@types/api/img';
import { Statistics, StatisticsDto } from '../@types/api/status';
import { Tag } from '../@types/api/tag';

export function imageToDto(image: Image) {
  const imageDto: ImageDto = {
    id: image.id,
    isNsfw: image.isNsfw,
    source: image.source,
    imgurId: image.imgurId,
    imgurDeleteHash: image.imgurDeleteHash,
    imgurUrl: image.imgurUrl,
    tags: image.tags,
  };

  return imageDto;
}

export function imageToDtoWithTags(image: Image, tags: Tag[]) {
  const imageDto: ImageDtoWithTags = {
    id: image.id,
    isNsfw: image.isNsfw,
    source: image.source,
    imgurId: image.imgurId,
    imgurDeleteHash: image.imgurDeleteHash,
    imgurUrl: image.imgurUrl,
    tags: tags,
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
