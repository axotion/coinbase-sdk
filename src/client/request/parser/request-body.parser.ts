export const parseRequestBody = (request: any): string => {
    return Object.keys(request).length > 0 ? JSON.stringify(request) : '';
};
