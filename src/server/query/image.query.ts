import { ObjectId } from 'bson';

import {
  createImageData,
  getImagesResponse,
  ImageDto,
  ImageProps,
} from '../../@types/api/img';
import { TagIds, TagProps } from '../../@types/api/tag';
import { queryForFilterImagesSchemaType } from '../../pages/api/img/[page]';
import { imageToDto } from '../../utils/converter-data';
import { isEmpty } from '../../utils/valitation';
import { prisma } from '../prisma';
import { getTagById } from './tag.query';

export async function getImages(
  includedTags: string,
  isNsfw: boolean,
  allImages: boolean,
  pagePosition: number,
  pageSize: number,
) {
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

  if (isNsfw) {
    return await prisma.image.findMany({
      skip: pagePosition * pageSize,
      take: pageSize,
      where: {
        isNsfw: true,
      },
      include: {
        ImageTag: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  if (!isEmpty(includedTags)) {
    const tagData = await prisma.tag.findUnique({
      where: {
        name: includedTags,
      },
    });

    return await prisma.image.findMany({
      skip: pagePosition * pageSize,
      take: pageSize,
      where: {
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

  return await prisma.image.findMany({
    skip: pagePosition * pageSize,
    take: pageSize,
    where: {
      isNsfw: false,
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
  });
}

export async function getImagesSize(
  includedTags: string,
  isNsfw: boolean,
  allImages: boolean,
) {
  if (allImages) {
    return await prisma.image.count();
  }

  if (isNsfw) {
    return await prisma.image.count({
      where: {
        isNsfw: true,
      },
    });
  }

  if (!isEmpty(includedTags)) {
    const tagData = await prisma.tag.findUnique({
      where: {
        name: includedTags,
      },
    });

    return await prisma.image.count({
      where: {
        isNsfw: false,
        ImageTag: {
          some: {
            tagId: tagData?.id,
          },
        },
      },
    });
  }

  return await prisma.image.count({
    where: {
      isNsfw: false,
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

  const imagesFromDatabase = await getImages(
    parameters.included_tags,
    parameters.is_nsfw,
    parameters.all,
    parameters.page,
    parameters.pageSize,
  );

  const imagesCountFromDatabase = await getImagesSize(
    parameters.included_tags,
    parameters.is_nsfw,
    parameters.all,
  );

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
