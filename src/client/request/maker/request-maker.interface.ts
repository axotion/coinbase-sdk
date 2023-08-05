import { PaginateQuery } from '../query/paginate.query';

export interface RequestMakerInterface {
  create<T>(path: string, requestBody: any): Promise<T>;

  read<T>(path: string, paginationQuery?: PaginateQuery): Promise<T>;

  update<T>(path: string, requestBody: any): Promise<T>;

  delete<T>(path: string): Promise<T>;
}
