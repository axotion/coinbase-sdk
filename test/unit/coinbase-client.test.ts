import {CoinbaseClient} from "../../src/client/coinbase.client";
import {HttpMethod} from "../../src/shared/http/http-method";
import {PaginateQuery} from "../../src/client/request/query/paginate.query";
import {RequestMakerInterface} from "../../src/client/request/maker/request-maker.interface";

it('Should return a list of accounts', async () => {

    const mockedResponse = {
        data: [
            {
                id: '123',
                name: 'test',
                primary: true,
                type: 'test',
                currency: 'test',
                balance: 'test',
                created_at: 'test',
                updated_at: 'test',
                resource: 'test',
                resource_path: 'test'
            }
        ],
        pagination: {
            ending_before: 'test',
            starting_after: 'test',
            limit: 10,
            order: 'asc',
        }
    }

    const requestMaker: RequestMakerInterface = {
        makeRequest: async <T>(path: string, method: keyof typeof HttpMethod, requestBody: any, paginationQuery?: PaginateQuery): Promise<T> => {
            return mockedResponse as unknown as T
        }
    }

    const coinbaseClient = new CoinbaseClient(requestMaker)
    const accounts = await coinbaseClient.getAccounts()

    expect(accounts).toStrictEqual(mockedResponse);

})