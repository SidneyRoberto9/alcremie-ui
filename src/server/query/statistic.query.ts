import { prisma } from '../prisma';

const where = {
  where: {
    id: process.env.STATISTICS_ID,
  },
};

export async function addNewImage() {
  return await prisma.statistics.update({
    ...where,
    data: {
      totalImages: {
        increment: 1,
      },
    },
  });
}

export async function addNewTag() {
  return await prisma.statistics.update({
    ...where,
    data: {
      totalTags: {
        increment: 1,
      },
    },
  });
}

export async function addRequest() {
  return await prisma.statistics.update({
    ...where,
    data: {
      totalRequests: {
        increment: 1,
      },
    },
  });
}

export async function getStatistics() {
  return await prisma.statistics.findUnique({
    ...where,
  });
}
