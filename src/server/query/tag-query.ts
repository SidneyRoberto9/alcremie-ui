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
  return await prisma.tag.findMany();
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
      is_nsfw: data.is_nsfw,
    },
  });
}
