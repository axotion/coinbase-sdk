import {DataResponse} from "./response/payload/common/data.response";
import {AddressResponse} from "./response/payload/address/address.response";
import {HttpMethod} from "../shared/http/http-method";
import {PaginatedDataResponse} from "./response/payload/common/paginated-data.response";
import {AccountResponse} from "./response/payload/account/account.response";
import {PaginateQuery} from "./request/query/paginate.query";
import {RequestMakerInterface} from "./request/maker/request-maker.interface";
import {ExchangeRateResponse} from "./response/payload/exchange-rate/exchange-rate.response";

export class CoinbaseClient {

    private requestMaker: RequestMakerInterface;

    constructor(requestMaker: RequestMakerInterface) {
        this.requestMaker = requestMaker;
    }

    async getExchangeRates(currency: string): Promise<DataResponse<ExchangeRateResponse>> {
        return this.requestMaker.makeRequest<DataResponse<any>>(`/v2/exchange-rates?currency=${currency}`, HttpMethod.GET, null)
    }

    async getAccounts(paginateQuery?: PaginateQuery): Promise<PaginatedDataResponse<AccountResponse[]>> {
        return this.requestMaker.makeRequest<Promise<PaginatedDataResponse<AccountResponse[]>>>(`/v2/accounts`, HttpMethod.GET, null, paginateQuery)
    }

    async getAccount(accountId: string): Promise<DataResponse<AccountResponse>> {
        return this.requestMaker.makeRequest<Promise<DataResponse<AccountResponse>>>(`/v2/accounts/${accountId}`, HttpMethod.GET, null)
    }

    async updateAccount(accountId: string, name: string): Promise<DataResponse<AccountResponse>> {
        return this.requestMaker.makeRequest<Promise<DataResponse<AccountResponse>>>(`/v2/accounts/${accountId}`, HttpMethod.PUT, {name: name})
    }

    async deleteAccount(accountId: string): Promise<void> {
        return this.requestMaker.makeRequest(`/v2/accounts/${accountId}`, HttpMethod.DELETE, null)
    }

    async createAddress(accountId: string, name?: string): Promise<DataResponse<AddressResponse>> {
        return this.requestMaker.makeRequest<Promise<DataResponse<AddressResponse>>>(`/v2/accounts/${accountId}/addresses`, HttpMethod.POST, name ? {name: name} : null)
    }

    async showAddress(accountId: string, addressId: string): Promise<DataResponse<AddressResponse>> {
        return this.requestMaker.makeRequest<Promise<DataResponse<AddressResponse>>>(`/v2/accounts/${accountId}/addresses/${addressId}`, HttpMethod.GET, null)
    }

}