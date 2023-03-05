import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { addRequest } from '../../../../server/query/statistic-query';
import { getUserById } from '../../../../server/query/user-query';

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

  const queryParams = req.query.ids;
  if (!queryParams) {
    return res.status(400).json({
      message: 'Query params not found',
    });
  }

  const userId = queryParams[0];
  const imageId = queryParams[1];

  const user = await getUserById(userId);

  if (!user) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  if (!user.favorites.includes(imageId)) {
    return res.status(200).json(false);
  }

  res.status(200).json(true);
});

export default apiRoute;
