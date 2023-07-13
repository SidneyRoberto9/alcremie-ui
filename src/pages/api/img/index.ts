import { z } from 'zod';
import nextConnect from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
import multer from 'multer';
import axios from 'axios';

import { getTagsFromImage } from '@/server/services/huggface';
import { cloudinaryUpload } from '@/server/services/cloudinary';
import { createNewTagOnlyByName } from '@/server/query/tag.query';

import { imgurUpload } from '../../../server/services/imgur-upload';
import { addRequest, addNewImage } from '../../../server/query/statistic.query';
import { createNewImage } from '../../../server/query/image.query';
import { setupCors } from '../../../server/cors';
import { ImageProps } from '../../../@types/api/img';

interface MulterRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadMiddleware = upload.single('picture');

const CreateNewImagePostSchema = z.object({
  source: z.string(),
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

  const tagsStringName = await getTagsFromImage(req.file);
  const isNotNsfw = tagsStringName.includes('rating:safe');

  const { asset_id, url } = await cloudinaryUpload(buffer);

  // //const { ImgurData } = await imgurUpload(buffer);

  // // if (ImgurData === null) {
  // //   return res.status(400).json({
  // //     message: 'No image provided',
  // //   });
  // // }

  // // const imageData: ImageProps = {
  // //   isNsfw: data.is_nsfw,
  // //   source: data.source,
  // //   imgurId: ImgurData.id,
  // //   imgurDeleteHash: ImgurData.deleteHash,
  // //   imgurUrl: ImgurData.link,
  // // };

  const imageData: ImageProps = {
    isNsfw: !isNotNsfw,
    source: data.source,
    imageAssetId: asset_id,
    imageUrl: url,
  };

  const tagsInImageIdList: Array<string> = [];

  for (let index = 0; index < tagsStringName.length; index++) {
    const tagSource = await createNewTagOnlyByName(tagsStringName[index]);

    tagsInImageIdList.push(tagSource.id);
  }

  const newImage = await createNewImage({ imageData, tags: tagsInImageIdList });
  await addNewImage();
  res.status(200).json({ image: newImage });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
