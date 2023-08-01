export interface AccountResponse {
    id: string
    name: string
    primary: boolean
    type: string
    currency: string
    balance: Balance
    created_at: string
    updated_at: string
    resource: string
    resource_path: string
    ready?: boolean
}

export interface Balance {
    amount: string
    currency: string
}
