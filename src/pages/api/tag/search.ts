import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';

import { findTagByName } from '@/server/query/tag.query';
import { addRequest } from '@/server/query/statistic.query';

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

  const queryParams = req.query.text as string;

  const tags = await findTagByName(queryParams);

  res.status(202).json({ tags: tags });
});

export default apiRoute;
