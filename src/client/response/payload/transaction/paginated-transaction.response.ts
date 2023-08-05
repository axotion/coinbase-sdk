export interface PaginatedTransactionResponse {
  id: string;
  type: string;
  status: string;
  amount: Amount;
  native_amount: NativeAmount;
  description: any;
  created_at: string;
  updated_at: string;
  resource: string;
  resource_path: string;
  buy: Buy;
  details: Details;
}

export interface Amount {
  amount: string;
  currency: string;
}

export interface NativeAmount {
  amount: string;
  currency: string;
}

export interface Buy {
  id: string;
  resource: string;
  resource_path: string;
}

export interface Details {
  title: string;
  subtitle: string;
}
