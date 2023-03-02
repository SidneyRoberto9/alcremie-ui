import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { z } from 'zod';

import { getImagesResponse, ImageDto } from '../../../@types/api/img';
import { TagProps } from '../../../@types/api/tag';
import { imageToDto } from '../../../utils/converter-data';
import { getImages, getImagesSize } from '../../../utils/image-query';
import { addRequest } from '../../../utils/statistic-query';
import { getTagById } from '../../../utils/tag-query';

const queryForFilterImagesSchema = z.object({
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
  const parameters = queryForFilterImagesSchema.parse(req.query);

  const imagesDataDto: ImageDto[] = [];

  const imagesFromDatabase = await getImages(
    parameters.included_tags,
    parameters.is_nsfw,
    parameters.all,
    parameters.page,
    parameters.pageSize,
  );

  const imagesCountFromDatabase = await getImagesSize(
    parameters.included_tags,
    parameters.is_nsfw,
    parameters.all,
  );

  for await (const image of imagesFromDatabase) {
    const imageTags: TagProps[] = [];

    for await (const TagData of image.ImageTag) {
      const searchedTag = await getTagById(TagData.tagId);

      if (searchedTag !== null) {
        imageTags.push(searchedTag);
      }
    }

    imagesDataDto.push(imageToDto(image, imageTags));
  }

  const resData: getImagesResponse = {
    totalContent: imagesCountFromDatabase,
    pageSize: parameters.pageSize,
    content: imagesDataDto.length > 0 ? imagesDataDto : null,
  };

  res.status(200).json(resData);
});

export default apiRoute;
