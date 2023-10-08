export interface Anime {
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
