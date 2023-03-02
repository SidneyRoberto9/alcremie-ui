import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { z } from 'zod';

import { TagProps } from '../../../@types/api/tag';
import { addNewTag, addRequest } from '../../../utils/statistic-query';
import { createNewTag, getTagsBySize } from '../../../utils/tag-query';

const CreateNewTagSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  is_nsfw: z.string().transform((value) => value === 'true'),
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

apiRoute.get(async (req, res) => {
  await addRequest();
  const { size } = req.query;

  let allTags: TagProps[] = [];

  if (size) {
    allTags = await getTagsBySize(Number(size));
  } else {
    allTags = await getTagsBySize();
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
