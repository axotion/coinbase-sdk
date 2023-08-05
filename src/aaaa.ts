import {CoinbaseClient} from "./client/coinbase.client";
import {ApiKeyRequestMaker} from "./client/request/maker/api-key-request.maker";

const bootstrap = async () => {

    const coinbaseClient = new CoinbaseClient(
        new ApiKeyRequestMaker(
            'ztuaKKIh4S1thgwO', 'AOjWmUrO77a9lGA7qFCoO9Vq8rnC4pdc'
        )
    );

    // const response = await coinbaseClient.getAccounts({
    //     limit: 10,
    //     order: 'asc'
    // })

    // const response = await coinbaseClient.createAddress('c7c795b4-0bb7-51be-8c0e-db031ac95a0a', {
    //     name: randomUUID()
    // })

    const response = await coinbaseClient.showAddress('c7c795b4-0bb7-51be-8c0e-db031ac95a0a', 'TEST');

    console.log(response)

}

bootstrap()
