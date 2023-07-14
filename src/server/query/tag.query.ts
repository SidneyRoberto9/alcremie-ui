import { prisma } from '../prisma';
import { TagWithImageCount, createTagDto } from '../../@types/api/tag';

export async function getTagById(id: string) {
  return await prisma.tag.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getTagsSize() {
  return await prisma.tag.count();
}

export async function getTagsPaged(page: number) {
  const tags = await prisma.tag.findMany({
    skip: page * 5,
    take: 5,
    orderBy: {
      name: 'asc',
    },
  });

  const tagsWithImageCount: TagWithImageCount[] = [];

  for await (const tag of tags) {
    const imagesWithTag = await prisma.image.count({
      where: {
        tags: {
          has: tag.id,
        },
      },
    });

    tagsWithImageCount.push({
      ...tag,
      image_size: imagesWithTag,
    });
  }

  return tagsWithImageCount;
}

export async function getAllTags() {
  return await prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getTagsBySize(size: number = 10) {
  return await prisma.tag.findMany({
    take: size,
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getTagByIdList(idList: string[]) {
  return await prisma.tag.findMany({
    where: {
      id: {
        in: idList,
      },
    },
  });
}

export async function createNewTag(data: createTagDto) {
  const tag = await prisma.tag.findUnique({
    where: {
      name: data.name,
    },
  });

  if (tag) {
    return tag;
  }

  return await prisma.tag.create({
    data: {
      name: data.name,
      description: data.description,
      is_nsfw: data.is_nsfw,
    },
  });
}

export async function createNewTagOnlyByName(name: string) {
  const tag = await prisma.tag.findUnique({
    where: {
      name: name,
    },
  });

  if (tag) {
    return tag;
  }

  return await prisma.tag.create({
    data: {
      name: name,
      description: 'blank',
      is_nsfw: false,
    },
  });
}

export async function deleteTag(id: string) {
  return await prisma.tag.delete({
    where: {
      id: id,
    },
  });
}

export async function getTagByName(name: string) {
  return await prisma.tag.findUnique({
    where: {
      name: name,
    },
  });
}

export async function findTagByName(name: string) {
  return await prisma.tag.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    take: 5,
  });
}
