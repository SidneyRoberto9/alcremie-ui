export interface GalleryFetchDataResponse {
  totalContent: number;
  pageSize: number;
  content: ImageData[] | null;
}

export interface ImageData {
  id: string;
  isNsfw: boolean;
  source: string;
  imgurId: string;
  imgurDeleteHash: string;
  imgurUrl: string;
  tags: Tag[];
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface GetGalleryDataParams {
  all: boolean;
  included_tags: string;
  is_nsfw: boolean;
}
