import {CoinbaseClient} from "../../src/client/coinbase.client";
import {PaginateQuery} from "../../src/client/request/query/paginate.query";
import {RequestMakerInterface} from "../../src/client/request/maker/request-maker.interface";


const createRequestMaker = (response: any): RequestMakerInterface => {
    return {
        async create<T>(path: string, requestBody: any): Promise<T> {
            return response as unknown as T
        }, async delete<T>(path: string): Promise<T> {
            return response as unknown as T
        }, async read<T>(path: string, paginationQuery?: PaginateQuery): Promise<T> {
            return response as unknown as T
        }, async update<T>(path: string, requestBody: any): Promise<T> {
            return response as unknown as T
        }
    }
}

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

    const coinbaseClient = new CoinbaseClient(createRequestMaker(mockedResponse))
    const accounts = await coinbaseClient.getAccounts()

    expect(accounts).toStrictEqual(mockedResponse);

})


it('should return an account', async () => {

    const mockedResponse = {
        data: {
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
    }

    const coinbaseClient = new CoinbaseClient(createRequestMaker(mockedResponse))
    const account = await coinbaseClient.getAccount('123')

    expect(account).toStrictEqual(mockedResponse);

})

it('should update an account', async () => {

    const mockedResponse = {
        data: {
            id: '123',
            name: 'test',
            primary: true,
            type: 'test',
            currency: 'test',
            balance: 'test',
            created_at: 'test',
        }
    }

    const coinbaseClient = new CoinbaseClient(createRequestMaker(mockedResponse))
    const account = await coinbaseClient.updateAccount('123', 'test')
    expect(account).toStrictEqual(mockedResponse);
})

it('should delete an account', async () => {

    const coinbaseClient = new CoinbaseClient(createRequestMaker(null))
    await coinbaseClient.deleteAccount('123')
})

it('should get exchange rates', async () => {

    const mockedResponse = {
        data: {
            currency: 'test',
            rates: {
                'BTC': 'test',
            }
        }
    }

    const coinbaseClient = new CoinbaseClient(createRequestMaker(mockedResponse))
    const exchangeRates = await coinbaseClient.getExchangeRates('BTC')
    expect(exchangeRates).toStrictEqual(mockedResponse);

})


it('should create an address', async () => {

    const mockedResponse = {
        data: {
            id: '123',
            address: 'test',
            name: 'test',
            created_at: 'test',
            updated_at: 'test',
            network: 'test',
            uri_scheme: 'test',
            resource: 'test',
            resource_path: 'test'
        }
    }

    const coinbaseClient = new CoinbaseClient(createRequestMaker(mockedResponse))
    const address = await coinbaseClient.createAddress('123')
    expect(address).toStrictEqual(mockedResponse);

})

it('should get an address', async () => {

    const mockedResponse = {
        data: {
            id: 'BTC',
            address: 'test',
            name: 'test',
            created_at: 'test',
            updated_at: 'test',
            network: 'test',
            uri_scheme: 'test',
            resource: 'test',
            resource_path: 'test'
        }
    }

    const coinbaseClient = new CoinbaseClient(createRequestMaker(mockedResponse))
    const address = await coinbaseClient.showAddress('123', 'BTC')
    expect(address).toStrictEqual(mockedResponse);

})