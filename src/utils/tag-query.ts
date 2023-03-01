import { createTagDto } from '../@types/api/tag';
import { prisma } from '../server/prisma';

export async function getTagById(id: string) {
  return await prisma.tag.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getTagsBySize(size: number = 10) {
  return await prisma.tag.findMany({
    take: size,
  });
}

export async function createNewTag(data: createTagDto) {
  return await prisma.tag.create({
    data: {
      name: data.name,
      description: data.description,
      isNsfw: data.is_nsfw,
    },
  });
}
