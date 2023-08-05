export interface PaginatedPaymentMethodResponse {
    id: string;
    type: string;
    name: string;
    currency: string;
    primary_buy: boolean;
    primary_sell: boolean;
    allow_buy: boolean;
    allow_sell: boolean;
    allow_deposit: boolean;
    allow_withdraw: boolean;
    instant_buy: boolean;
    instant_sell: boolean;
    created_at: string;
    updated_at: string;
    resource: string;
    resource_path: string;
    fiat_account: FiatAccount;
}

export interface FiatAccount {
    id: string;
    resource: string;
    resource_path: string;
}
