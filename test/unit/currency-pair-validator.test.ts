import { validateCurrencyPair } from '../../src/client/request/validator/currency-pair.validator';

it('Should return noting if currency pair is valid', () => {
  const currencyPair = 'BTC-USD';
  validateCurrencyPair(currencyPair);
});

it('Should throw error if currency pair is invalid', () => {
  const currencyPair = 'BTCUSD';
  expect(() => validateCurrencyPair(currencyPair)).toThrowError(
    'currencyPair must be in the format of BTC-USD',
  );
});
