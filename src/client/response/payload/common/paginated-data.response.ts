import {DataResponse} from "./data.response";

export interface PaginatedDataResponse<T> {
    pagination: Pagination
    data: DataResponse<T>[]
}

export interface Pagination {
    ending_before: any
    starting_after: any
    limit: number
    order: string
    previous_uri: any
    next_uri: any
}