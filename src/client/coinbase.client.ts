import {DataResponse} from "./response/payload/common/data.response";
import {AddressResponse} from "./response/payload/address/address.response";
import {HttpMethod} from "../shared/http/http-method";
import {CreateAddressRequest} from "./request/payload/address/create-address.request";
import {PaginatedDataResponse} from "./response/payload/common/paginated-data.response";
import {AccountResponse} from "./response/payload/account/account.response";
import {PaginateQuery} from "./request/query/paginate.query";
import {RequestMakerInterface} from "./request/maker/request-maker.interface";

export class CoinbaseClient {

    private requestMaker: RequestMakerInterface;

    constructor(requestMaker: RequestMakerInterface) {
        this.requestMaker = requestMaker;
    }

    async getAccounts(paginateQuery?: PaginateQuery): Promise<PaginatedDataResponse<AccountResponse[]>> {
        return this.requestMaker.makeRequest<Promise<PaginatedDataResponse<AccountResponse[]>>>(`/v2/accounts`, HttpMethod.GET, null, paginateQuery)
    }

    async createAddress(accountId: string, createAddressRequest: CreateAddressRequest): Promise<DataResponse<AddressResponse>> {
        return this.requestMaker.makeRequest<Promise<DataResponse<AddressResponse>>>(`/v2/accounts/${accountId}/addresses`, HttpMethod.POST, createAddressRequest)
    }

}