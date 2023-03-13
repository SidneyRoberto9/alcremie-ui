import { ObjectId } from 'bson';

import {
  createImageData,
  getImageProps,
  getImagesResponse,
  getImagesSizeProps,
  ImageProps,
} from '../../@types/api/img';
import { queryForFilterImagesSchemaType } from '../../pages/api/img/[page]';
import { BodyForUpdateImageSchema } from '../../pages/api/img/update';
import { imageToDto } from '../../utils/converter-data';
import { isEmpty } from '../../utils/valitation';
import { prisma } from '../prisma';
import { getTagByName } from './tag.query';

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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  if (!isEmpty(includedTags)) {
    return await prisma.image.findMany({
      skip: pagePosition * pageSize,
      take: pageSize,
      where: {
        tags: {
          has: includedTags,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  if (isNsfw) {
    return await prisma.image.findMany({
      skip: pagePosition * pageSize,
      take: pageSize,
      where: {
        isNsfw: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return await prisma.image.findMany({
    skip: pagePosition * pageSize,
    take: pageSize,
    where: {
      isNsfw: false,
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

  if (!isEmpty(includedTags)) {
    return await prisma.image.count({
      where: {
        tags: {
          has: includedTags,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  if (isNsfw) {
    return await prisma.image.count({
      where: {
        isNsfw: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return await prisma.image.count({
    where: {
      isNsfw: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function createNewImage(data: createImageData) {
  const { imageData, tags } = data;
  const tagsInImageIdList = tags.map((tag) => tag.id);
  const image: ImageProps = {
    ...imageData,
    id: new ObjectId().toHexString(),
  };

  return await prisma.image.create({
    data: {
      id: image.id,
      isNsfw: image.isNsfw,
      source: image.source,
      imgurId: image.imgurId,
      imgurDeleteHash: image.imgurDeleteHash,
      imgurUrl: image.imgurUrl,
      tags: tagsInImageIdList,
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
  const tag = await getTagByName(parameters.included_tags);

  const imagesFromDatabase = await getImages({
    allImages: parameters.all,
    includedTags: tag?.id || '',
    isNsfw: parameters.is_nsfw,
    pagePosition: parameters.page,
    pageSize: parameters.pageSize,
  });

  const totalContent = await getImagesSize({
    allImages: parameters.all,
    includedTags: tag?.id || '',
    isNsfw: parameters.is_nsfw,
  });

  const images = imagesFromDatabase.map(imageToDto);

  const resData: getImagesResponse = {
    totalContent: totalContent,
    pageSize: parameters.pageSize,
    content: images.length > 0 ? images : null,
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

  return images.map(imageToDto);
}

export async function updateImageData(data: BodyForUpdateImageSchema) {
  const { id, tags, nsfw, source } = data;

  const image = await prisma.image.findUnique({
    where: {
      id,
    },
  });

  if (image === null) {
    return null;
  }

  await prisma.image.update({
    where: {
      id,
    },
    data: {
      isNsfw: nsfw,
      source,
      tags,
    },
  });

  return true;
}
