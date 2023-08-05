export interface PaginatedBuyResponse {
    id: string;
    status: string;
    payment_method: PaymentMethod;
    transaction: Transaction;
    amount: Amount;
    total: Total;
    subtotal: Subtotal;
    created_at: string;
    updated_at: string;
    resource: string;
    resource_path: string;
    committed: boolean;
    instant: boolean;
    fee: Fee;
    payout_at: string;
}

export interface PaymentMethod {
    id: string;
    resource: string;
    resource_path: string;
}

export interface Transaction {
    id: string;
    resource: string;
    resource_path: string;
}

export interface Amount {
    amount: string;
    currency: string;
}

export interface Total {
    amount: string;
    currency: string;
}

export interface Subtotal {
    amount: string;
    currency: string;
}

export interface Fee {
    amount: string;
    currency: string;
}
