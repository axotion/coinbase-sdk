# Coinbase SDK

Coinbase SDK without external dependencies. Based purely on fetch API.

## Features
- [x] Typescript support
- [x] No external dependencies
- [x] Coinbase API v2 support (https://developers.coinbase.com/api/v2)
- [x] Notification verifier for webhooks
- [x] High test coverage
- [x] Easy of use and extendability

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
- [ ] deposits
- [x] payment_methods
- [x] prices
- [ ] sells
- [x] transactions
- [ ] users
- [ ] withdrawals
- [x] exchange_rates
- [x] time
- [x] currencies
- [x] prices

## How to run tests
```bash
npm run test
```


## License

[MIT](https://choosealicense.com/licenses/mit/)



