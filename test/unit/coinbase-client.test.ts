import {CoinbaseClient} from "../../src/client/coinbase.client";
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
        async create<T>(path: string, requestBody: any): Promise<T> {
            return mockedResponse as unknown as T
        }, async delete<T>(path: string): Promise<T> {
            return mockedResponse as unknown as T
        }, async read<T>(path: string, paginationQuery?: PaginateQuery): Promise<T> {
            return mockedResponse as unknown as T
        }, async update<T>(path: string, requestBody: any): Promise<T> {
            return mockedResponse as unknown as T
        }

    }

    const coinbaseClient = new CoinbaseClient(requestMaker)
    const accounts = await coinbaseClient.getAccounts()

    expect(accounts).toStrictEqual(mockedResponse);

})