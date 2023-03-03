import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { z } from 'zod';

import { getImagesResponse } from '../../../@types/api/img';
import { getImagesResponseData } from '../../../utils/image-query';
import { addRequest } from '../../../utils/statistic-query';

export const queryForFilterImagesSchema = z.object({
  page: z.string().transform((value) => Number(value)),
  included_tags: z.string().optional().default(''),
  is_nsfw: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  all: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  pageSize: z
    .string()
    .optional()
    .default('25')
    .transform((value) => Number(value)),
});

export type queryForFilterImagesSchemaType = z.infer<
  typeof queryForFilterImagesSchema
>;

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
  const parameters: queryForFilterImagesSchemaType =
    queryForFilterImagesSchema.parse(req.query);

  const resData: getImagesResponse = await getImagesResponseData(parameters);

  res.status(200).json(resData);
});

export default apiRoute;
