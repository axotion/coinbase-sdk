import {PaginateQuery} from './paginate.query';

export const buildQuery = (paginationQuery: PaginateQuery): string => {
    let firstQuery = true;
    let queryPath = '';

    for (const [key, value] of Object.entries(paginationQuery)) {
        queryPath += `${firstQuery ? '?' : '&'}${key}=${value}`;
        firstQuery = false;
    }

    return queryPath;
};
