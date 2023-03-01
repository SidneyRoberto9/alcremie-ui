import { TagProps } from './tag';

export interface getImagesResponse {
  totalContent: number;
  pageSize: number;
  content: ImageDto[] | null;
}

export interface ImageDto {
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
  tags: TagProps[];
}

export interface ImageProps {
  id?: string;
  format: string;
  width: number;
  height: number;
  size: number;
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
