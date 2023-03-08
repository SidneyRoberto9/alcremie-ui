import { createTagDto } from '../../@types/api/tag';
import { prisma } from '../prisma';

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
  return await prisma.tag.create({
    data: {
      name: data.name,
      description: data.description,
      is_nsfw: data.is_nsfw,
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
