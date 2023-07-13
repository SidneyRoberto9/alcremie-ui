import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';

import { statisticsToDto } from '../../../utils/converter-data';
import { getStatistics, addRequest } from '../../../server/query/statistic.query';

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

  const statistics = await getStatistics();

  if (!statistics) {
    return res.status(404).json({
      message: 'No statistics found',
    });
  }

  res.status(200).json(statisticsToDto(statistics));
});

export default apiRoute;
