import { ImageDto } from '../@types/api/img';
import { TagProps } from '../@types/api/tag';

export function imageToDto(image: any, tags: TagProps[]) {
  const imageDto: ImageDto = {
    id: image.id,
    format: image.format,
    width: image.width,
    height: image.height,
    size: image.size,
    isNsfw: image.isNsfw,
    source: image.source,
    imgurId: image.imgurId,
    imgurDeleteHash: image.imgurDeleteHash,
    imgurUrl: image.imgurUrl,
    tags: tags,
  };

  return imageDto;
}
