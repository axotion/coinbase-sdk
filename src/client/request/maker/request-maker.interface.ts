import {HttpMethod} from "../../../shared/http/http-method";
import {PaginateQuery} from "../query/paginate.query";

export interface RequestMakerInterface {
    makeRequest<T>(path: string, method: keyof typeof HttpMethod, requestBody: any, paginationQuery?: PaginateQuery): Promise<T>;
}