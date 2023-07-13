import { z } from 'zod';
import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';

import { getTagsBySize, getAllTags, createNewTag } from '../../../server/query/tag.query';
import { addRequest, addNewTag } from '../../../server/query/statistic.query';
import { setupCors } from '../../../server/cors';
import { TagProps } from '../../../@types/api/tag';

const CreateNewTagSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  is_nsfw: z.boolean(),
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

apiRoute.use(setupCors);

apiRoute.get(async (req, res) => {
  await addRequest();
  const { size } = req.query;

  let allTags: TagProps[] = [];

  if (size) {
    allTags = await getTagsBySize(Number(size));
  } else {
    allTags = await getAllTags();
  }

  res.status(200).json({ tags: allTags });
});

apiRoute.post(async (req, res) => {
  await addRequest();
  const tagData = CreateNewTagSchema.parse(req.body);

  const newTag = await createNewTag(tagData);
  await addNewTag();
  res.status(200).json({ tag: newTag });
});

export default apiRoute;
