import { prisma } from '../server/prisma';

export async function addNewImage() {
  return await prisma.statistics.update({
    where: {
      id: process.env.STATISTICS_ID,
    },
    data: {
      totalImages: {
        increment: 1,
      },
    },
  });
}

export async function addNewTag() {
  return await prisma.statistics.update({
    where: {
      id: process.env.STATISTICS_ID,
    },
    data: {
      totalTags: {
        increment: 1,
      },
    },
  });
}

export async function addRequest() {
  return await prisma.statistics.update({
    where: {
      id: process.env.STATISTICS_ID,
    },
    data: {
      totalRequests: {
        increment: 1,
      },
    },
  });
}

export async function getStatistics() {
  return await prisma.statistics.findUnique({
    where: {
      id: process.env.STATISTICS_ID,
    },
  });
}
