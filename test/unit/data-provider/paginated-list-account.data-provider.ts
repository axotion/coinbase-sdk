export const paginatedAccountResponseDataProvider = {
  pagination: {
    ending_before: null,
    starting_after: null,
    limit: 25,
    order: 'desc',
    previous_uri: null,
    next_uri: null,
  },
  data: [
    {
      id: '58542935-67b5-56e1-a3f9-42686e07fa40',
      name: 'My Vault',
      primary: false,
      type: 'vault',
      currency: 'BTC',
      balance: {
        amount: '4.00000000',
        currency: 'BTC',
      },
      created_at: '2015-01-31T20:49:02Z',
      updated_at: '2015-01-31T20:49:02Z',
      resource: 'account',
      resource_path: '/v2/accounts/58542935-67b5-56e1-a3f9-42686e07fa40',
      ready: true,
    },
    {
      id: '2bbf394c-193b-5b2a-9155-3b4732659ede',
      name: 'My Wallet',
      primary: true,
      type: 'wallet',
      currency: 'BTC',
      balance: {
        amount: '39.59000000',
        currency: 'BTC',
      },
      created_at: '2015-01-31T20:49:02Z',
      updated_at: '2015-01-31T20:49:02Z',
      resource: 'account',
      resource_path: '/v2/accounts/2bbf394c-193b-5b2a-9155-3b4732659ede',
    },
  ],
};
