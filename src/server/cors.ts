import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import NextCors from 'nextjs-cors';

export async function setupCors(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
  });
  next();
}
