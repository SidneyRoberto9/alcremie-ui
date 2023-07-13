export interface GalleryFetchDataResponse {
  totalContent: number;
  pageSize: number;
  content: ImageDto[] | null;
}

export interface ImageData {
  id: string;
  isNsfw: boolean;
  source: string;
  imageId: string;
  imageUrl: string;
  tags: string[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface GetGalleryDataParams {
  all: boolean;
  included_tags: string;
  is_nsfw: boolean;
}

export interface CreateImg {
  file: any;
  source: string;
  nsfw: boolean;
  tags: TagIds[];
}
