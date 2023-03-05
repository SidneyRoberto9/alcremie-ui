import sharp from 'sharp';

import { imgur } from '../imgur';

export async function imgurUpload(buf: Buffer) {
  const sharpBuf = await sharp(buf).jpeg({ quality: 90 }).toBuffer();

  //generate new album to up for production
  const { data } = await imgur.upload({
    image: sharpBuf,
    type: 'stream',
    album: 'QV3N6YY90tu0HPk',
  });

  const ImgurData = {
    id: data.id,
    deleteHash: data.deletehash as string,
    link: data.link,
  };

  return { ImgurData };
}
