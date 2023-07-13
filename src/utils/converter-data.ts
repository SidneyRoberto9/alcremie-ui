import { Image } from '@prisma/client';

import { Tag } from '../@types/api/tag';
import { StatisticsDto, Statistics } from '../@types/api/status';
import { ImageDtoWithTags, ImageDto } from '../@types/api/img';

export function imageToDto(image: Image) {
  const imageDto: ImageDto = {
    id: image.id,
    isNsfw: image.isNsfw,
    source: image.source,
    imageAssetId: image.imageAssetId,
    imageUrl: image.imageUrl,
    tags: image.tags,
  };

  return imageDto;
}

export function imageToDtoWithTags(image: Image, tags: Tag[]) {
  const imageDto: ImageDtoWithTags = {
    id: image.id,
    isNsfw: image.isNsfw,
    source: image.source,
    imageAssetId: image.imageAssetId,
    imageUrl: image.imageUrl,
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
