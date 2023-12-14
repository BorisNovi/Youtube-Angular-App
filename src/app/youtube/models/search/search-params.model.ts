export enum SearchOrder {
  relevance = 'relevance',
  date = 'date',
  rating = 'rating',
  title = 'title',
  videoCount = 'videoCount',
  viewCount = 'viewCount',
}

export interface ISearch {
  q?: string;
  maxResults?: number;
  order?: SearchOrder;
  pageToken?: string;
}
