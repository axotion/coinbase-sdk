import {DataResponse} from './data.response';

export interface PaginatedDataResponse<T extends any[]> {
  pagination: Pagination;
  data: DataResponse<T>;
}

export interface Pagination {
  ending_before: string;
  starting_after: string;
  limit: number;
  order: string;
  previous_uri: string;
  next_uri: string;
}
