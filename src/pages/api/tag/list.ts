import { z } from 'zod';
import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';

import { createNewTagOnlyByName } from '../../../server/query/tag.query';
import { addRequest, addNewTag } from '../../../server/query/statistic.query';
import { setupCors } from '../../../server/cors';

const TagListSchema = z.object({
  tags: z.array(z.string()),
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

apiRoute.post(async (req, res) => {
  await addRequest();
  const tagListData = TagListSchema.parse(req.body);
  const tagListId = [];

  for (const name of tagListData.tags) {
    const tag = await createNewTagOnlyByName(name);
    await addNewTag();
    tagListId.push(tag.id);
  }

  await addNewTag();
  res.status(200).json({ tags: tagListId });
});

export default apiRoute;
