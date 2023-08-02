# Coinbase SDK

Coinbase SDK without external dependencies. Based on fetch API.

## Features
- [x] Typescript support
- [x] No external dependencies
- [x] Coinbase API v2 support (https://developers.coinbase.com/api/v2)
- [x] Notification verifier for webhooks
- [x] High test coverage
- [x] Easy of use and extendability

## Requirements
- NodeJS >= 18.0.0
- API keys - https://www.coinbase.com/settings/api with permissions you need to use (e.g. wallet:accounts:read). Depends on what methods you want to use.


## Installation

```bash
npm i coinbase-sdk
```

## Usage of Client

```typescript
import { CoinbaseClient, HttpRequestMaker } from 'coinbase-sdk';

const coinbaseClient = new CoinbaseClient(
    new HttpRequestMaker(
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
await notificationVerifier.verify(request)

```

## Supported methods 

- [x] accounts
- [x] addresses
- [] buys
- [] checkouts
- [] current_user
- [] deposits
- [] notifications
- [] orders
- [] payment_methods
- [] prices
- [] reports
- [] sells
- [] transactions
- [] transfers
- [] users
- [] withdrawals
- [x] exchange_rates

## How to run tests
```bash
npm run test
```


## License

[MIT](https://choosealicense.com/licenses/mit/)



