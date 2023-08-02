import {DataResponse} from "./response/payload/common/data.response";
import {AddressResponse} from "./response/payload/address/address.response";
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
        return this.requestMaker.read<DataResponse<ExchangeRateResponse>>(`/v2/exchange-rates?currency=${currency}`)
    }

    async getAccounts(paginateQuery?: PaginateQuery): Promise<PaginatedDataResponse<AccountResponse[]>> {
        return this.requestMaker.read<Promise<PaginatedDataResponse<AccountResponse[]>>>(`/v2/accounts`, paginateQuery)
    }

    async getAccount(accountId: string): Promise<DataResponse<AccountResponse>> {
        return this.requestMaker.read<Promise<DataResponse<AccountResponse>>>(`/v2/accounts/${accountId}`)
    }

    async updateAccount(accountId: string, name: string): Promise<DataResponse<AccountResponse>> {
        return this.requestMaker.update<Promise<DataResponse<AccountResponse>>>(`/v2/accounts/${accountId}`, {name: name})
    }

    async deleteAccount(accountId: string): Promise<void> {
        return this.requestMaker.delete(`/v2/accounts/${accountId}`)
    }

    async createAddress(accountId: string, name?: string): Promise<DataResponse<AddressResponse>> {
        return this.requestMaker.create<Promise<DataResponse<AddressResponse>>>(`/v2/accounts/${accountId}/addresses`, name ? {name: name} : null)
    }

    async showAddress(accountId: string, addressId: string): Promise<DataResponse<AddressResponse>> {
        return this.requestMaker.read<Promise<DataResponse<AddressResponse>>>(`/v2/accounts/${accountId}/addresses/${addressId}`)
    }

}