import {HttpMethod} from '../../../shared/http/http-method';
import crypto from 'node:crypto';

export const signRequest = (
    apiSecret: string,
    timestamp: number,
    httpMethod: keyof typeof HttpMethod,
    path: string,
    body?: string,
): string => {
    return crypto
        .createHmac('sha256', apiSecret)
        .update(timestamp.toString() + httpMethod + path + body)
        .digest('hex');
};
