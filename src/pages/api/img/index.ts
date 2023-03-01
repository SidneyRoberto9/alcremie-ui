import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { z } from 'zod';

import { ImageProps } from '../../../@types/api/img';
import { createNewImage } from '../../../utils/image-query';
import { imgurUpload } from '../../../utils/imgur-upload';

interface MulterRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadMiddleware = upload.single('picture');

const CreateNewImagePostSchema = z.object({
  source: z.string().min(1),
  is_nsfw: z.boolean(),
  tags: z.array(z.object({ id: z.string().min(1) })),
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

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  const data = CreateNewImagePostSchema.parse(JSON.parse(req.body.document));
  const { buffer, mimetype, size } = req.file;

  const { ImgurData } = await imgurUpload(buffer);

  if (ImgurData === null) {
    return res.status(400).json({
      message: 'No image provided',
    });
  }

  const imageData: ImageProps = {
    format: mimetype,
    width: 0,
    height: 0,
    size: size,
    isNsfw: data.is_nsfw,
    source: data.source,
    imgurId: ImgurData.id,
    imgurDeleteHash: ImgurData.deleteHash,
    imgurUrl: ImgurData.link,
  };

  const newImage = await createNewImage({ imageData, tags: data.tags });

  res.status(200).json({ image: newImage });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
