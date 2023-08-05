export const paginatedPaymentMethodDataProvider = {
    "pagination": {
        "ending_before": null,
        "starting_after": null,
        "limit": 25,
        "order": "desc",
        "previous_uri": null,
        "next_uri": null
    },
    "data": [
        {
            "id": "127b4d76-a1a0-5de7-8185-3657d7b526ec",
            "type": "fiat_account",
            "name": "USD Wallet",
            "currency": "USD",
            "primary_buy": false,
            "primary_sell": false,
            "allow_buy": true,
            "allow_sell": true,
            "allow_deposit": true,
            "allow_withdraw": true,
            "instant_buy": true,
            "instant_sell": true,
            "created_at": "2015-02-24T14:30:30-08:00",
            "updated_at": "2015-02-24T14:30:30-08:00",
            "resource": "payment_method",
            "resource_path": "/v2/payment-methods/127b4d76-a1a0-5de7-8185-3657d7b526ec",
            "fiat_account": {
                "id": "a077fff9-312b-559b-af98-146c33e27388",
                "resource": "account",
                "resource_path": "/v2/accounts/a077fff9-312b-559b-af98-146c33e27388"
            }
        },
        {
            "id": "83562370-3e5c-51db-87da-752af5ab9559",
            "type": "ach_bank_account",
            "name": "International Bank *****1111",
            "currency": "USD",
            "primary_buy": true,
            "primary_sell": true,
            "allow_buy": true,
            "allow_sell": true,
            "allow_deposit": true,
            "allow_withdraw": true,
            "instant_buy": false,
            "instant_sell": false,
            "created_at": "2015-01-31T20:49:02Z",
            "updated_at": "2015-02-11T16:53:57-08:00",
            "resource": "payment_method",
            "resource_path": "/v2/payment-methods/83562370-3e5c-51db-87da-752af5ab9559"
        }
    ]
}