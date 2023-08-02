export class ExchangeRateResponse {
    currency: string;
    rates: {
        [key: string]: string;
    }
}