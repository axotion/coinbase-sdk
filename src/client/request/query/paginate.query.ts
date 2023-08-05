export interface PaginateQuery {
  limit?: number;
  order?: 'asc' | 'desc';
  starting_after?: string;
  ending_before?: string;
}
