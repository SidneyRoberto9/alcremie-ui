export interface Statistics {
  id: string;
  totalImages: number;
  totalTags: number;
  totalRequests: number;
}

export interface StatisticsDto {
  tags: number;
  images: number;
  requests: number;
}

interface StatisticsData {
  tags: number;
  images: number;
  requests: number;
}
