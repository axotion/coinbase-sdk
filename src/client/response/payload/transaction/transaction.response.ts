export interface TransactionResponse {
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
  network: Network;
  to: To;
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

export interface Network {
  status: string;
  hash: string;
  name: string;
}

export interface To {
  resource: string;
  address: string;
}

export interface Details {
  title: string;
  subtitle: string;
}
