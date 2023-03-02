import { ImageDto } from '../@types/api/img';
import { Statistics, StatisticsDto } from '../@types/api/status';
import { TagProps } from '../@types/api/tag';

export function imageToDto(image: any, tags: TagProps[]) {
  const imageDto: ImageDto = {
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
