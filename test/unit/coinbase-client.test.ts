import { CoinbaseClient } from '../../src/client/coinbase.client';
import { paginatedTransactionResponseDataProvider } from './data-provider/paginated-transaction.data-provider';
import { paginatedAccountResponseDataProvider } from './data-provider/paginated-list-account.data-provider';
import { createRequestMaker } from './mock/create-request-maker.mock';
import { accountDataProvider } from './data-provider/account.data-provider';
import { exchangeRateDataProvider } from './data-provider/exchange-rate.data-provider';
import { addressDataProvider } from './data-provider/address.data-provider';
import { transactionDataProvider } from './data-provider/transaction.data-provider';
import { paymentMethodDataProvider } from './data-provider/payment-method.data-provider';
import { paginatedPaymentMethodDataProvider } from './data-provider/paginated-payment-method.data-provider';
import { fiatCurrencyDataProvider } from './data-provider/fiat-currency.data-provider';
import { timeDataProvider } from './data-provider/time.data-provider';
import { priceDataProvider } from './data-provider/price.data-provider';
import { cryptoCurrencyDataProvider } from './data-provider/crypto-currency.data-provider';

it('Should return a list of accounts', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(paginatedAccountResponseDataProvider),
  );
  const response = await coinbaseClient.listAccounts();
  expect(response).toStrictEqual(paginatedAccountResponseDataProvider);
});

it('should return an account', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(accountDataProvider),
  );
  const response = await coinbaseClient.showAccount('123');
  expect(response).toStrictEqual(accountDataProvider);
});

it('should update an account', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(accountDataProvider),
  );
  const response = await coinbaseClient.updateAccount('123', 'My Wallet');
  expect(response).toStrictEqual(accountDataProvider);
});

it('should delete an account', async () => {
  const coinbaseClient = new CoinbaseClient(createRequestMaker(null));
  await coinbaseClient.deleteAccount('123');
});

it('should get exchange rates', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(exchangeRateDataProvider),
  );
  const response = await coinbaseClient.getExchangeRates('BTC');
  expect(response).toStrictEqual(exchangeRateDataProvider);
});

it('should create an address', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(addressDataProvider),
  );
  const response = await coinbaseClient.createAddress('123');
  expect(response).toStrictEqual(addressDataProvider);
});

it('should get an address', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(addressDataProvider),
  );
  const response = await coinbaseClient.showAddress('123', 'BTC');
  expect(response).toStrictEqual(addressDataProvider);
});

it('should get a list of transactions', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(paginatedTransactionResponseDataProvider),
  );
  const response = await coinbaseClient.listTransactions('abc');
  expect(response).toStrictEqual(paginatedTransactionResponseDataProvider);
});

it('should get a transaction', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(transactionDataProvider),
  );
  const response = await coinbaseClient.showTransaction('abc', '123');
  expect(response).toStrictEqual(transactionDataProvider);
});

it('should send money', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(transactionDataProvider),
  );
  const response = await coinbaseClient.sendMoney('abc', '123', '0.01', 'BTC');
  expect(response).toStrictEqual(transactionDataProvider);
});

it('should throw exception on send money when toFinancialInstitution is set and financialInstitutionWebsite not', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(transactionDataProvider),
  );

  let expectedException = null;

  try {
    await coinbaseClient.sendMoney('abc', '123', '0.01', 'BTC', {
      toFinancialInstitution: true,
    });
  } catch (exception) {
    expectedException = exception;
  }

  expect(expectedException?.message).toStrictEqual(
    'financialInstitutionWebsite is required when toFinancialInstitution is true',
  );
});

it('should transfer money', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(transactionDataProvider),
  );
  const response = await coinbaseClient.transferMoney(
    'abc',
    '123',
    '0.01',
    'BTC',
  );
  expect(response).toStrictEqual(transactionDataProvider);
});

it('should show payment method', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(paymentMethodDataProvider),
  );
  const response = await coinbaseClient.showPaymentMethod('abc');
  expect(response).toStrictEqual(paymentMethodDataProvider);
});

it('should show payment methods', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(paginatedPaymentMethodDataProvider),
  );
  const response = await coinbaseClient.showPaymentMethod('abc');
  expect(response).toStrictEqual(paginatedPaymentMethodDataProvider);
});

it('should get fiat currencies', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(fiatCurrencyDataProvider),
  );
  const response = await coinbaseClient.getFiatCurrencies();
  expect(response).toStrictEqual(fiatCurrencyDataProvider);
});

it('should get a time', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(timeDataProvider),
  );
  const response = await coinbaseClient.getCurrentTime();
  expect(response).toStrictEqual(timeDataProvider);
});

it('should get a buy price', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(priceDataProvider),
  );
  const response = await coinbaseClient.getBuyPrice('BTC-USD');
  expect(response).toStrictEqual(priceDataProvider);
});

it('should get a sell price', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(priceDataProvider),
  );
  const response = await coinbaseClient.getSellPrice('BTC-USD');
  expect(response).toStrictEqual(priceDataProvider);
});

it('should get a spot price', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(priceDataProvider),
  );
  const response = await coinbaseClient.getSpotPrice('BTC-USD');
  expect(response).toStrictEqual(priceDataProvider);
});

it('should get crypto currencies', async () => {
  const coinbaseClient = new CoinbaseClient(
    createRequestMaker(cryptoCurrencyDataProvider),
  );
  const response = await coinbaseClient.getCryptoCurrencies();
  expect(response).toStrictEqual(cryptoCurrencyDataProvider);
});
