# Coinbase SDK

Coinbase SDK without external dependencies. Based purely on fetch API, this implementation ensures that the SDK remains lightweight and self-contained, without relying on any third-party libraries or modules for handling HTTP requests and other functionalities.

## Features
- [x] Typescript support
- [x] No external dependencies
- [x] Coinbase API v2 support (https://developers.coinbase.com/api/v2)
- [x] Notification verifier for webhooks/notifications
- [x] High test coverage
- [x] Easy of use

## Supported authentication methods

- [x] API key
- [ ] OAuth2


## Requirements
- NodeJS >= 18.0.0
- API keys - https://www.coinbase.com/settings/api with permissions you need to use (e.g. wallet:accounts:read). Depends on what methods you want to use.


## Installation

```bash
npm i coinbase-sdk
```

## Usage of Client

A new instance of CoinbaseClient is created using the ApiKeyRequestMaker constructor. The ApiKeyRequestMaker class is used to handle API key-based authentication with Coinbase. It requires two arguments: the apikey and apisecret. These values should be replaced with your actual Coinbase API key and API secret.

A new strategy called OAuth2RequestMaker is in **TBA** state. It will be used to handle OAuth2 authentication with Coinbase.

It may throw exceptions like 
- **PayloadPreconditionFailedException** - when payload is not valid, e.g. missing required fields or some fields are required by other fields
- **RequestTimedoutException** - when request timed out, 30 seconds is a value set by coinbase
- **InvalidResponseException** - when response is not valid, e.g. status code is not 200 or response is not in JSON format. This exception also contains json response body (jsonResponse).
```typescript
import {CoinbaseClient, ApiKeyRequestMaker} from 'coinbase-sdk';

const coinbaseClient = new CoinbaseClient(
    new ApiKeyRequestMaker(
        'apikey', 'apisecret'
    )
);

const response = await coinbaseClient.getAccounts({
    limit: 10,
    order: 'asc'
})
```

## Usage of notification Verifier

The provided code demonstrates the usage of the NotificationVerifier class from the coinbase-sdk library. The NotificationVerifier is a utility class that allows you to verify the authenticity and integrity of incoming notifications from Coinbase.

**Return value**:

If the verification is successful, the verify method will complete normally without throwing any exceptions or errors.

If the verification fails, the verify method will throw an InvalidSignatureException. This exception indicates that the signature of the incoming notification is invalid, suggesting that the notification may not be from Coinbase or may have been tampered with.


```typescript
import { NotificationVerifier } from 'coinbase-sdk';

const notificationVerifier = new NotificationVerifier();

// Request from express / koa / pure nodejs
// Will throw InvalidSignatureException if signature is invalid
await notificationVerifier.verify(request)

```

## Supported client methods

- [x] accounts
- [x] addresses
- [x] buys
- [ ] deposits - **In progress**
- [x] payment_methods
- [x] prices
- [ ] sells - In progress
- [x] transactions
- [ ] ~~users~~ - **Will not be supported**
- [ ] withdrawals - **In progress**
- [x] exchange_rates
- [x] time
- [x] currencies
- [x] prices

## How to run tests
```bash
npm run test
```


## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Contact
kamilfronczak@pm.me

