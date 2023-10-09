export interface Image {
  id: string;
  assetId: string;
  isNsfw: boolean;
  size: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Status {
  image: number;
  tag: number;
  request: number;
}

export interface ImageFetch {
  content: ImageContent;
}

export interface ImageContent {
  page: string;
  totalPage: number;
  hasNext: boolean;
  data: Image[];
}
