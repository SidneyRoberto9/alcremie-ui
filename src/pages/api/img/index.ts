import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { z } from 'zod';

import { ImageProps } from '../../../@types/api/img';
import { setupCors } from '../../../server/cors';
import { createNewImage } from '../../../server/query/image.query';
import { addNewImage, addRequest } from '../../../server/query/statistic.query';
import { imgurUpload } from '../../../server/services/imgur-upload';

interface MulterRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadMiddleware = upload.single('picture');

const CreateNewImagePostSchema = z.object({
  source: z.string(),
  is_nsfw: z.boolean(),
  tags: z.array(z.object({ id: z.string().min(1) })).min(1),
});

const apiRoute = nextConnect<MulterRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

apiRoute.use(setupCors);
apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  await addRequest();
  const data = CreateNewImagePostSchema.parse(JSON.parse(req.body.document));
  const { buffer } = req.file;

  const { ImgurData } = await imgurUpload(buffer);

  if (ImgurData === null) {
    return res.status(400).json({
      message: 'No image provided',
    });
  }

  const imageData: ImageProps = {
    isNsfw: data.is_nsfw,
    source: data.source,
    imgurId: ImgurData.id,
    imgurDeleteHash: ImgurData.deleteHash,
    imgurUrl: ImgurData.link,
  };

  const newImage = await createNewImage({ imageData, tags: data.tags });
  await addNewImage();
  res.status(200).json({ image: newImage });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
