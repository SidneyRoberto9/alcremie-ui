import { ObjectId } from 'bson';

import {
  createImageData,
  getImageProps,
  getImagesResponse,
  getImagesSizeProps,
  ImageDto,
  ImageProps,
} from '../../@types/api/img';
import { Tag, TagIds, TagProps } from '../../@types/api/tag';
import { queryForFilterImagesSchemaType } from '../../pages/api/img/[page]';
import { imageToDto, imageToDtoWithoutTags } from '../../utils/converter-data';
import { isEmpty } from '../../utils/valitation';
import { prisma } from '../prisma';
import { getTagById } from './tag.query';

export async function getImages({
  allImages,
  includedTags,
  isNsfw,
  pagePosition,
  pageSize,
}: getImageProps) {
  if (allImages) {
    return await prisma.image.findMany({
      skip: pagePosition * pageSize,
      take: pageSize,
      include: {
        ImageTag: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  let tagData: Tag | null = null;

  if (!isEmpty(includedTags)) {
    tagData = await prisma.tag.findUnique({
      where: {
        name: includedTags,
      },
    });
  }

  return await prisma.image.findMany({
    skip: pagePosition * pageSize,
    take: pageSize,
    where: isEmpty(includedTags)
      ? {
          isNsfw: isNsfw,
        }
      : {
          ImageTag: {
            some: {
              tagId: tagData?.id,
            },
          },
        },
    include: {
      ImageTag: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getImageById(id: string) {
  return await prisma.image.findUnique({
    where: {
      id,
    },
    include: {
      ImageTag: true,
    },
  });
}

export async function getImagesSize({
  allImages,
  includedTags,
  isNsfw,
}: getImagesSizeProps) {
  if (allImages) {
    return await prisma.image.count();
  }

  let tagData: Tag | null = null;

  if (!isEmpty(includedTags)) {
    tagData = await prisma.tag.findUnique({
      where: {
        name: includedTags,
      },
    });
  }

  return await prisma.image.count({
    where: isEmpty(includedTags)
      ? {
          isNsfw: isNsfw,
        }
      : {
          ImageTag: {
            some: {
              tagId: tagData?.id,
            },
          },
        },
  });
}

export async function createNewImage(data: createImageData) {
  const { imageData, tags } = data;

  let tagsInImageIdList: TagIds[] = [];

  const image: ImageProps = {
    ...imageData,
    id: new ObjectId().toHexString(),
  };

  tags.forEach(async (tag) => {
    const imageTag = await prisma.imageTag.create({
      data: {
        imageId: image.id as string,
        tagId: tag.id,
      },
    });

    tagsInImageIdList.push({ id: imageTag.id });
  });

  return await prisma.image.create({
    data: {
      id: image.id,
      isNsfw: image.isNsfw,
      source: image.source,
      imgurId: image.imgurId,
      imgurDeleteHash: image.imgurDeleteHash,
      imgurUrl: image.imgurUrl,
      ImageTag: {
        connect: tagsInImageIdList,
      },
    },
  });
}

export async function getRandomImage() {
  const images = await prisma.image.findMany({
    where: {
      isNsfw: false,
    },
  });

  const imagesUrl = images.map((image) => {
    return {
      image: image.imgurUrl,
      id: image.id,
    };
  });

  const randomImage = imagesUrl[Math.floor(Math.random() * imagesUrl.length)];

  return randomImage;
}

export async function getImagesResponseData(
  parameters: queryForFilterImagesSchemaType,
) {
  const imagesDataDto: ImageDto[] = [];

  const imagesFromDatabase = await getImages({
    allImages: parameters.all,
    includedTags: parameters.included_tags,
    isNsfw: parameters.is_nsfw,
    pagePosition: parameters.page,
    pageSize: parameters.pageSize,
  });

  const imagesCountFromDatabase = await getImagesSize({
    allImages: parameters.all,
    includedTags: parameters.included_tags,
    isNsfw: parameters.is_nsfw,
  });

  for await (const image of imagesFromDatabase) {
    const imageTags: TagProps[] = [];

    for await (const TagData of image.ImageTag) {
      const searchedTag = await getTagById(TagData.tagId);

      if (searchedTag !== null) {
        imageTags.push(searchedTag);
      }
    }

    imagesDataDto.push(imageToDto(image, imageTags));
  }

  const resData: getImagesResponse = {
    totalContent: imagesCountFromDatabase,
    pageSize: parameters.pageSize,
    content: imagesDataDto.length > 0 ? imagesDataDto : null,
  };

  return resData;
}

export async function getUserFavoritesImages(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user === null) {
    return null;
  }

  const images = await prisma.image.findMany({
    where: {
      id: {
        in: user.favorites,
      },
    },
  });

  return images.map(imageToDtoWithoutTags);
}
