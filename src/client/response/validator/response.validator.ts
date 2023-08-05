import {InvalidResponseException} from './exception/invalid-response.exception';

export const validateResponse = async (
    rawResponse: Response,
): Promise<string> => {
    const jsonResponse = await rawResponse.json();

    if (rawResponse.status > 299 || rawResponse.status < 200) {
        throw new InvalidResponseException(
            `Expected status between 200 and 299, got ${rawResponse.status}`,
            jsonResponse,
            rawResponse.url,
        );
    }

    return jsonResponse;
};
