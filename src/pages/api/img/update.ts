import { z } from 'zod';
import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';

import { imageToDtoWithTags } from '../../../utils/converter-data';
import { getTagByIdList } from '../../../server/query/tag.query';
import { addRequest } from '../../../server/query/statistic.query';
import { updateImageData } from '../../../server/query/image.query';

export const bodyForUpdateImageSchema = z.object({
  id: z.string(),
  tags: z.array(z.string()),
  nsfw: z.boolean(),
  source: z.string(),
});

export type BodyForUpdateImageSchema = z.infer<typeof bodyForUpdateImageSchema>;

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

apiRoute.put(async (req, res) => {
  await addRequest();

  const data: BodyForUpdateImageSchema = bodyForUpdateImageSchema.parse(req.body);

  const image = await updateImageData(data);
  const tagsInImage = await getTagByIdList(image.tags);
  const returnedImageData = imageToDtoWithTags(image, tagsInImage);

  res.status(200).json({ ...returnedImageData });
});

export default apiRoute;
