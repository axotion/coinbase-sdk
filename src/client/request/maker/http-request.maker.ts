import {HttpMethod} from "../../../shared/http/http-method";
import {PaginateQuery} from "../query/paginate.query";
import {getCurrentTimestamp} from "../../../shared/time/get-current-timestamp";
import {buildQuery} from "../query/query.builder";
import {signRequest} from "../signer/request.signer";
import {parseRequestBody} from "../parser/request-body.parser";
import {RequestTimedOutException} from "./exception/request-timed-out.exception";
import {validateResponse} from "../../response/validator/response.validator";
import {RequestMakerInterface} from "./request-maker.interface";


export class HttpRequestMaker implements RequestMakerInterface {

    private readonly baseUrl = 'https://api.coinbase.com'

    private readonly apiKey: string;

    private readonly apiSecret: string;

    private readonly version = '2023-07-31'

    /*
   Your timestamp must be within 30 seconds of the API service time, or your request will be considered expired and rejected.
   If you think there is a time skew between your server and the API servers, use the time API endpoint to query for the API server time.

   ref: https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-key-authentication
    */
    private readonly timeout = 1000 * 30;

    constructor(apiKey: string, apiSecret: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    async makeRequest<T>(path: string, method: keyof typeof HttpMethod, requestBody: any, paginationQuery?: PaginateQuery): Promise<T> {
        const currentTimestamp = getCurrentTimestamp()

        if (paginationQuery) {
            path += buildQuery(paginationQuery)
        }

        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), this.timeout);

        try {
            const requestOptions = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'CB-ACCESS-SIGN': signRequest(this.apiSecret, currentTimestamp, method, path, requestBody ? parseRequestBody(requestBody) : ''),
                    'CB-ACCESS-TIMESTAMP': currentTimestamp.toString(),
                    'CB-ACCESS-KEY': this.apiKey,
                    'CB-VERSION': this.version
                },
                signal: abortController.signal,
            }

            if (requestBody) {
                requestOptions['body'] = requestBody ? parseRequestBody(requestBody) : ''
            }

            const rawResponse = await fetch(`${this.baseUrl}${path}`, requestOptions)
            return await validateResponse(rawResponse) as T
        } catch (exception) {

            if (exception instanceof DOMException) {
                throw new RequestTimedOutException('Request timeout')
            }

            throw exception;

        } finally {
            clearTimeout(timeoutId);
        }
    }

}

