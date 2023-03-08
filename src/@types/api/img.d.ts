export interface getImagesResponse {
  totalContent: number;
  pageSize: number;
  content: ImageDto[] | null;
}

export interface ImageDto {
  id: string;
  isNsfw: boolean;
  source: string;
  imgurId: string;
  imgurDeleteHash: string;
  imgurUrl: string;
  tags: string[];
}

export interface ImageDtoWithTags extends ImageDto {
  tags: Tag[];
}

export interface ImageProps {
  id?: string;
  isNsfw: boolean;
  source: string;
  imgurId: string;
  imgurDeleteHash: string;
  imgurUrl: string;
}

export interface createImageData {
  imageData: ImageProps;
  tags: TagIds[];
}

export interface getImageProps {
  includedTags: string;
  isNsfw: boolean;
  allImages: boolean;
  pagePosition: number;
  pageSize: number;
}

export interface getImagesSizeProps {
  includedTags: string;
  isNsfw: boolean;
  allImages: boolean;
}
