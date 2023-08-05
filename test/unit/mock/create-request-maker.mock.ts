import {RequestMakerInterface} from "../../../src/client/request/maker/request-maker.interface";
import {PaginateQuery} from "../../../src/client/request/query/paginate.query";

export const createRequestMaker = (response: any): RequestMakerInterface => {
    return {
        async create<T>(path: string, requestBody: any): Promise<T> {
            return response as unknown as T
        }, async delete<T>(path: string): Promise<T> {
            return response as unknown as T
        }, async read<T>(path: string, paginationQuery?: PaginateQuery): Promise<T> {
            return response as unknown as T
        }, async update<T>(path: string, requestBody: any): Promise<T> {
            return response as unknown as T
        }
    }
}