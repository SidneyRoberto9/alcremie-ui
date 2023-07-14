import FormData from 'form-data';
import axios from 'axios';

export async function getTagsFromImage(file: Express.Multer.File) {
  const urlReq: string = process.env.HUGGING_FACE_API as string;

  const { buffer, mimetype, originalname } = file;

  const form = new FormData();
  form.append('picture', buffer, {
    contentType: mimetype,
    filename: originalname,
  });

  const { data } = await axios.post(urlReq, form, {
    headers: form.getHeaders(),
  });

  return data[0];
}
