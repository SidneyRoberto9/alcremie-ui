import { prisma } from '../prisma';

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function isFavoriteInUser(id: string, imageId: string) {
  const user = await getUserById(id);

  if (!user) {
    return null;
  }

  if (user.favorites.includes(imageId)) {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        favorites: user.favorites.filter((fav) => fav !== imageId),
      },
    });

    return false;
  }

  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      favorites: [...user.favorites, imageId],
    },
  });

  return true;
}
