export const cryptoCurrencyDataProvider = [
    {
        "code": "BTC",
        "name": "Bitcoin",
        "color": "#F7931A",
        "sort_index": 100,
        "exponent": 8,
        "type": "crypto",
        "address_regex": "^([13][a-km-zA-HJ-NP-Z1-9]{25,34})|^(bc1[qzry9x8gf2tvdw0s3jn54khce6mua7l]([qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}|[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{58}))$",
        "asset_id": "5b71fc48-3dd3-540c-809b-f8c94d0e68b5"
    },
    {
        "code": "ETH",
        "name": "Ethereum",
        "color": "#627EEA",
        "sort_index": 102,
        "exponent": 8,
        "type": "crypto",
        "address_regex": "^(?:0x)?[0-9a-fA-F]{40}$",
        "asset_id": "d85dce9b-5b73-5c3c-8978-522ce1d1c1b4"
    },
    {
        "code": "ETH2",
        "name": "Ethereum 2",
        "color": "#8E76FF",
        "sort_index": 161,
        "exponent": 8,
        "type": "crypto",
        "address_regex": "^(?:0x)?[0-9a-fA-F]{40}$",
        "asset_id": "3bec5bf3-507a-51ba-8e41-dc953b1a5c4d"
    },
    {
        "code": "ETC",
        "name": "Ethereum Classic",
        "color": "#59D4AF",
        "sort_index": 103,
        "exponent": 8,
        "type": "crypto",
        "address_regex": "^(?:0x)?[0-9a-fA-F]{40}$",
        "asset_id": "c16df856-0345-5358-8a70-2a78c804e61f"
    }
]