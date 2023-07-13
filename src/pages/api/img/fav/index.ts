import { z } from 'zod';
import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';

import { isFavoriteInUser } from '../../../../server/query/user.query';
import { addRequest } from '../../../../server/query/statistic.query';

const AddToFavoritesSchema = z.object({
  userId: z.string().min(1),
  imageId: z.string().min(1),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

apiRoute.post(async (req, res) => {
  await addRequest();

  const { imageId, userId } = AddToFavoritesSchema.parse(req.body);

  const isFavorite = await isFavoriteInUser(userId, imageId);

  if (isFavorite === null) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  res.status(200).json(isFavorite);
});

export default apiRoute;
