import { PayloadPreconditionFailedException } from '../maker/exception/payload-precondition-failed.exception';

export const validateCurrencyPair = (currencyPair: string): void => {
  const regexp = new RegExp('^[A-Z]{3}-[A-Z]{3}$');

  if (!regexp.test(currencyPair)) {
    throw new PayloadPreconditionFailedException(
      'currencyPair must be in the format of BTC-USD',
    );
  }
};
