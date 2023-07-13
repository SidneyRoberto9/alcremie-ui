import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';

import { CloudinaryData } from '@/@types/api/img';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function cloudinaryUpload(buf: Buffer) {
  const sharpBuf = await sharp(buf).webp({ quality: 90 }).toBuffer();
  const bucket = 'alcremie-bucket';

  return new Promise<CloudinaryData>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: bucket,
        },
        (error, result) => {
          if (result) {
            const data: CloudinaryData = {
              asset_id: result.asset_id,
              url: result.url,
            };
            resolve(data);
          } else {
            console.log(error);
            reject(error);
          }
        },
      )
      .end(sharpBuf);
  });
}
