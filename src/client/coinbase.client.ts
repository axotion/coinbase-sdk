import {DataResponse} from './response/payload/common/data.response';
import {AddressResponse} from './response/payload/address/address.response';
import {PaginatedDataResponse} from './response/payload/common/paginated-data.response';
import {AccountResponse} from './response/payload/account/account.response';
import {PaginateQuery} from './request/query/paginate.query';
import {RequestMakerInterface} from './request/maker/request-maker.interface';
import {ExchangeRateResponse} from './response/payload/exchange-rate/exchange-rate.response';
import {PaginatedTransactionResponse} from './response/payload/transaction/paginated-transaction.response';
import {TransactionResponse} from './response/payload/transaction/transaction.response';
import {PayloadPreconditionFailedException} from './request/maker/exception/payload-precondition-failed.exception';
import {PaginatedPaymentMethodResponse} from './response/payload/payment/paginated-payment-method.response';
import {PaymentMethodResponse} from './response/payload/payment/payment-method.response';
import {FiatCurrenciesResponse} from './response/payload/fiat-currencies/fiat-currencies.response';
import {TimeResponse} from './response/payload/time/time.response';
import {PriceResponse} from './response/payload/price/price.response';
import {validateCurrencyPair} from './request/validator/currency-pair.validator';
import {PaginatedBuyResponse} from './response/payload/buy/paginated-buy.response';
import {BuyResponse} from './response/payload/buy/buy.response';
import {PaginatedSellResponse} from './response/payload/sell/paginated-sell.response';
import {SellResponse} from './response/payload/sell/sell.response';

export class CoinbaseClient {
  private requestMaker: RequestMakerInterface;

  constructor(requestMaker: RequestMakerInterface) {
    this.requestMaker = requestMaker;
  }

  /*
        Get current exchange rates. Default base currency is USD but it can be defined as any supported currency (see Currencies endpoint).
        Returned rates will define the exchange rate for one unit of the base currency.

        Permissions
        This endpoint does not require any permission.
     */
  async getExchangeRates(
      currency: string,
  ): Promise<DataResponse<ExchangeRateResponse>> {
    return this.requestMaker.read<DataResponse<ExchangeRateResponse>>(
        `/v2/exchange-rates?currency=${currency}`,
    );
  }

  /*
        List a current user's accounts to which the authentication method has access to.

        Permissions
        This endpoint requires the "wallet:accounts:read" permission.
     */
  async listAccounts(
      paginateQuery?: PaginateQuery,
  ): Promise<PaginatedDataResponse<AccountResponse[]>> {
    return this.requestMaker.read<
        Promise<PaginatedDataResponse<AccountResponse[]>>
    >(`/v2/accounts`, paginateQuery);
  }

  /*
        Show (or get) a current user's account. To access the primary account for a given currency, a currency string (e.g., BTC or ETH) can be used instead of the account ID in the URL.

        Permissions
        This endpoint requires the "wallet:accounts:read" permission.
     */
  async showAccount(accountId: string): Promise<DataResponse<AccountResponse>> {
    return this.requestMaker.read<Promise<DataResponse<AccountResponse>>>(
        `/v2/accounts/${accountId}`,
    );
  }

  /*
        Modify a user's account.

        Permissions
        This endpoint requires the "wallet:accounts:update" permission.
     */
  async updateAccount(
      accountId: string,
      name: string,
  ): Promise<DataResponse<AccountResponse>> {
    return this.requestMaker.update<Promise<DataResponse<AccountResponse>>>(
        `/v2/accounts/${accountId}`,
        {name: name},
    );
  }

  /*
        Remove a user's account. You cannot remove:

        Primary accounts
        Accounts with non-zero balance
        Fiat accounts
        Vaults with a pending withdrawal

        Permissions
        This endpoint requires the "wallet:accounts:delete" permission.
     */
  async deleteAccount(accountId: string): Promise<void> {
    return this.requestMaker.delete(`/v2/accounts/${accountId}`);
  }

  /*
        Creates a new address for an account. Addresses can be created for wallet account types.

        Permissions
        This endpoint requires the "wallet:addresses:create" permission.
     */
  async createAddress(
      accountId: string,
      name?: string,
  ): Promise<DataResponse<AddressResponse>> {
    return this.requestMaker.create<Promise<DataResponse<AddressResponse>>>(
        `/v2/accounts/${accountId}/addresses`,
        name ? {name: name} : null,
    );
  }

  /**
   *      Get a single address for an account. A regular cryptocurrency address can be used in place of address_id but the address must be associated with the correct account.
   *
   *      Permissions
   *      This endpoint requires the "wallet:addresses:read" permission.
   */
  async showAddress(
      accountId: string,
      addressId: string,
  ): Promise<DataResponse<AddressResponse>> {
    return this.requestMaker.read<Promise<DataResponse<AddressResponse>>>(
        `/v2/accounts/${accountId}/addresses/${addressId}`,
    );
  }

  /**
   * List transactions that have been sent to a specific address. A regular cryptocurrency address can be used in place of address_id but the address must be associated with the correct account.
   *
   * Permissions
   * This endpoint requires the "wallet:transactions:read" permission.
   **/
  async listTransactions(
      accountId: string,
      paginateQuery?: PaginateQuery,
  ): Promise<PaginatedDataResponse<PaginatedTransactionResponse[]>> {
    return this.requestMaker.read<
        Promise<PaginatedDataResponse<PaginatedTransactionResponse[]>>
    >(`/v2/accounts/${accountId}/transactions`, paginateQuery);
  }

  /**
   * Get a single address for an account. A regular cryptocurrency address can be used in place of address_id but the address must be associated with the correct account.
   *
   * Permissions
   * This endpoint requires the "wallet:addresses:read" permission.
   */
  async showTransaction(
      accountId: string,
      transactionId: string,
  ): Promise<DataResponse<TransactionResponse>> {
    return this.requestMaker.read<Promise<DataResponse<TransactionResponse>>>(
        `/v2/accounts/${accountId}/transactions/${transactionId}`,
    );
  }

  /**
   * Send funds to a network address for any Coinbase supported asset, or email address of the recipient. No transaction fees are required for off-blockchain cryptocurrency transactions.
   *
   * Coinbase recommends that you always supply a unique idem field for each transaction.
   *
   * Permissions
   * This endpoint requires the "wallet:transactions:send" permission.
   */
  async sendMoney(
      accountId: string,
      to: string,
      amount: string,
      currency: string,
      options?: {
        idem?: string;
        toFinancialInstitution?: boolean;
        financialInstitutionWebsite?: string;
        memo?: string;
        description?: string;
        skipNotifications?: boolean;
        destinationTag?: string;
      },
  ): Promise<DataResponse<TransactionResponse>> {
    if (
        options &&
        options.toFinancialInstitution &&
        !options.financialInstitutionWebsite
    ) {
      throw new PayloadPreconditionFailedException(
          'financialInstitutionWebsite is required when toFinancialInstitution is true',
      );
    }

    const payload = {
      type: 'send',
      to: to,
      amount: amount,
      currency: currency,
    };

    if (options && options.idem) {
      payload['idem'] = options.idem;
    }

    if (options && options.destinationTag) {
      payload['destination_tag'] = options.destinationTag;
    }

    if (options && options.description) {
      payload['description'] = options.description;
    }

    if (options && options.skipNotifications) {
      payload['skip_notifications'] = options.skipNotifications;
    }

    if (options && options.memo) {
      payload['memo'] = options.memo;
    }

    if (options && options.toFinancialInstitution) {
      payload['to_financial_institution'] = options.toFinancialInstitution;
      payload['financial_institution_website'] =
          options.financialInstitutionWebsite;
    }

    return this.requestMaker.create<Promise<DataResponse<TransactionResponse>>>(
        `/v2/accounts/${accountId}/transactions`,
        payload,
    );
  }

  /**
   * Transfer any Coinbase supported digital asset between two of a single user's accounts. The following transfers are allowed:
   *
   * Permissions
   * This endpoint requires the "wallet:transactions:transfer" permission.
   */
  async transferMoney(
      accountId: string,
      to: string,
      amount: string,
      currency: string,
      description?: string,
  ): Promise<DataResponse<TransactionResponse>> {
    const payload = {
      type: 'transfer',
      to: to,
      amount: amount,
      currency: currency,
    };

    if (description) {
      payload['description'] = description;
    }

    return this.requestMaker.create<Promise<DataResponse<TransactionResponse>>>(
        `/v2/accounts/${accountId}/transactions`,
        payload,
    );
  }

  /**
   * Lists the current user's payment methods.
   *
   * Permissions
   * This endpoint requires the "wallet:payment-methods:read" permission.
   */
  async listPaymentMethods(
      paginateQuery?: PaginateQuery,
  ): Promise<PaginatedDataResponse<PaginatedPaymentMethodResponse[]>> {
    return this.requestMaker.read<
        Promise<PaginatedDataResponse<PaginatedPaymentMethodResponse[]>>
    >(`/v2/payment-methods`, paginateQuery);
  }

  /**
   * Get a single payment method (of the current user) by payment method ID.
   *
   * Permissions
   * This endpoint requires the "wallet:payment-methods:read" permission.
   */
  async showPaymentMethod(
      paymentMethodId: string,
  ): Promise<DataResponse<PaymentMethodResponse>> {
    return this.requestMaker.read<Promise<DataResponse<PaymentMethodResponse>>>(
        `/v2/payment-methods/${paymentMethodId}`,
    );
  }

  /**
   * Lists known fiat currencies. Currency codes conform to the ISO 4217 standard where possible. Currencies with no representation in ISO 4217 may use a custom code.
   *
   * Permissions
   * This endpoint does not require any permission.
   */
  async getFiatCurrencies(): Promise<DataResponse<FiatCurrenciesResponse[]>> {
    return this.requestMaker.read<
        Promise<DataResponse<FiatCurrenciesResponse[]>>
    >(`/v2/currencies`);
  }

  /**
   * Get the API server time.
   *
   * Permissions
   * This endpoint does not require any permission.
   */
  async getCurrentTime(): Promise<DataResponse<TimeResponse>> {
    return this.requestMaker.read<Promise<DataResponse<TimeResponse>>>(
        `/v2/time`,
    );
  }

  /**
   * Get the total price to buy one bitcoin or ether.
   *
   * Note that exchange rates fluctuates so the price is only correct for seconds at the time. This buy price includes standard Coinbase fee (1%) but excludes any other fees including bank fees.
   * If you need more accurate price estimate for a specific payment method or amount, see buy bitcoin endpoint and quote: true option.
   *
   * Permissions
   * This endpoint does not require any permission.
   */
  async getBuyPrice(
      currencyPair: string,
  ): Promise<DataResponse<PriceResponse>> {
    validateCurrencyPair(currencyPair);
    return this.requestMaker.read<Promise<DataResponse<PriceResponse>>>(
        `/v2/prices/${currencyPair}/buy`,
    );
  }

  /**
   * Get the total price to sell one bitcoin or ether.
   *
   * Note that exchange rates fluctuates so the price is only correct for seconds at the time. This sell price includes standard Coinbase fee (1%) but excludes any other fees including bank fees.
   * If you need more accurate price estimate for a specific payment method or amount, see sell bitcoin endpoint and quote: true option.
   *
   * Permissions
   * This endpoint does not require any permission.
   */
  async getSellPrice(
      currencyPair: string,
  ): Promise<DataResponse<PriceResponse>> {
    validateCurrencyPair(currencyPair);
    return this.requestMaker.read<Promise<DataResponse<PriceResponse>>>(
        `/v2/prices/${currencyPair}/sell`,
    );
  }

  /**
   * Get the current market price for bitcoin. This is usually somewhere in between the buy and sell price.
   *
   * Note that exchange rates fluctuates so the price is only correct for seconds at the time.
   *
   * You can also get historic prices with date parameter.
   *
   * Permissions
   * This endpoint does not require any permission.
   */
  async getSpotPrice(
      currencyPair: string,
      date?: Date,
  ): Promise<DataResponse<PriceResponse>> {
    validateCurrencyPair(currencyPair);
    let url = `/v2/prices/${currencyPair}/spot`;

    if (date) {
      url += `?date=${date.toISOString()}`;
    }

    return this.requestMaker.read<Promise<DataResponse<PriceResponse>>>(url);
  }

  /**
   * Lists buys for an account.
   *
   * Permissions
   * This endpoint requires the "wallet:buys:read" permission.
   */
  async listBuys(
      paginateQuery?: PaginateQuery,
  ): Promise<PaginatedDataResponse<PaginatedBuyResponse[]>> {
    return this.requestMaker.read<
        Promise<PaginatedDataResponse<PaginatedBuyResponse[]>>
    >(`/v2/buys`, paginateQuery);
  }

  /**
   * Show an individual buy.
   *
   * Permissions
   * This endpoint requires the "wallet:buys:read" permission.
   */
  async showBuy(buyId: string): Promise<DataResponse<BuyResponse>> {
    return this.requestMaker.read<Promise<DataResponse<BuyResponse>>>(
        `/v2/buys/${buyId}`,
    );
  }

  /**
   * Buys a user-defined amount of any Coinbase supported asset.
   *
   * Permissions
   * This endpoint requires the "wallet:buys:create" permission.
   */
  async placeBuy(
      amount: string,
      currency: string,
      paymentMethodId: string,
      options?: {
        commit?: boolean;
        quote?: string;
        agree_btc_amount_varies?: boolean;
      },
  ): Promise<DataResponse<BuyResponse>> {
    const payload = {
      amount: amount,
      currency: currency,
      payment_method: paymentMethodId,
    };

    if (options && options.commit) {
      payload['commit'] = options.commit;
    }

    if (options && options.quote) {
      payload['quote'] = options.quote;
    }

    if (options && options.agree_btc_amount_varies) {
      payload['agree_btc_amount_varies'] = options.agree_btc_amount_varies;
    }

    return this.requestMaker.create<Promise<DataResponse<BuyResponse>>>(
        `/v2/buys`,
        payload,
    );
  }

  /**
   * Completes a buy that is created in commit: false state.
   *
   * If the exchange rate has changed since the buy was created, this call will fail with the error “The exchange rate updated while you were waiting. The new total is shown below”.
   *
   * The buy's total will also be updated. You can repeat the /commit call to accept the new values and start the buy at the new rates.
   *
   * Permissions
   * This endpoint requires the "wallet:buys:create" permission.
   */
  async commitBuy(buyId: string): Promise<DataResponse<BuyResponse>> {
    return this.requestMaker.update<Promise<DataResponse<BuyResponse>>>(
        `/v2/buys/${buyId}/commit`,
        {},
    );
  }

  /**
   * Lists sells for an account.
   *
   * Permissions
   * This endpoint requires the "wallet:sells:read" permission.
   */
  async listSells(
      paginateQuery?: PaginateQuery,
  ): Promise<PaginatedDataResponse<PaginatedSellResponse[]>> {
    return this.requestMaker.read<
        Promise<PaginatedDataResponse<PaginatedSellResponse[]>>
    >(`/v2/sells`, paginateQuery);
  }

  /**
   * Show an individual sell.
   *
   * Permissions
   * This endpoint requires the "wallet:sells:read" permission.
   */
  async showSell(sellId: string): Promise<DataResponse<SellResponse>> {
    return this.requestMaker.read<Promise<DataResponse<SellResponse>>>(
        `/v2/sells/${sellId}`,
    );
  }
}
