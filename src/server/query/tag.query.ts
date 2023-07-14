import { prisma } from '../prisma';
import { createTagDto } from '../../@types/api/tag';

export async function getTagById(id: string) {
  return await prisma.tag.findUnique({
    where: {
      id: id,
    },
  });
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
