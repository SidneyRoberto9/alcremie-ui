import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';

import { deleteTag } from '../../../server/query/tag.query';
import { removeTag, addRequest } from '../../../server/query/statistic.query';

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

  const queryParams = req.query.id;

  if (!queryParams) {
    return res.status(400).json({
      message: 'Query params not found',
    });
  }

  const tag = await deleteTag(String(queryParams));

  if (!tag) {
    return res.status(400).json({
      message: 'Tag not found',
    });
  }

  await removeTag();
  res.status(202).json({ message: 'Tag deleted' });
});

export default apiRoute;
