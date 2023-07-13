import { z } from 'zod';
import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';

import { imgurDelete } from '../../../../server/services/imgur-delete';
import { removeImage, addRequest } from '../../../../server/query/statistic.query';
import { deleteImageByHashDeleteId } from '../../../../server/query/image.query';

export const bodyForDeleteImageSchema = z.object({
  id: z.string(),
});

export type BodyForDeleteImageSchema = z.infer<typeof bodyForDeleteImageSchema>;

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

apiRoute.delete(async (req, res) => {
  await addRequest();
  await removeImage();

  const { id }: BodyForDeleteImageSchema = bodyForDeleteImageSchema.parse(req.query);

  const image = await deleteImageByHashDeleteId(id);
  await imgurDelete(id);

  res.status(200).json(image);
});

export default apiRoute;
