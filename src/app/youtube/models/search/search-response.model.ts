export interface SearchResponseModel<T> {
  TODO: string;
  kind: string;
  etag: string;
  prevPageToken: string,
  nextPageToken: string,
  pageInfo: IpageInfo;
  items: T[];
}

interface IpageInfo {
  totalResults: number;
  resultsPerPage: number;
}
