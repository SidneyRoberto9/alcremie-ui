import sharp from 'sharp';

import { imgur } from '../imgur';

export async function imgurUpload(buf: Buffer) {
  const sharpBuf = await sharp(buf).jpeg({ quality: 90 }).toBuffer();

  const { data } = await imgur.upload({
    image: sharpBuf,
    type: 'stream',
    album: process.env.IMGUR_ALBUM_ID,
  });

  const ImgurData = {
    id: data.id,
    deleteHash: data.deletehash as string,
    link: data.link,
  };

  return { ImgurData };
}
