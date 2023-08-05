export interface ExchangeRateResponse {
  currency: string;
  rates: {
    [key: string]: string;
  };
}
