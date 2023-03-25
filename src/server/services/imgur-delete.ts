import { imgur } from '../imgur';

export async function imgurDelete(deleteHashId: string) {
  const { data } = await imgur.deleteImage(deleteHashId);

  return { data };
}
