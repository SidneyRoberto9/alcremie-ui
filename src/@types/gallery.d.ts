export interface GalleryFetchDataResponse {
  totalContent: number;
  pageSize: number;
  content: ImageData[] | null;
}

export interface ImageData {
  id: string;
  format: string;
  width: number;
  height: number;
  size: number;
  isNsfw: boolean;
  source: string;
  imgurId: string;
  imgurDeleteHash: string;
  imgurUrl: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  is_nsfw: boolean;
}
