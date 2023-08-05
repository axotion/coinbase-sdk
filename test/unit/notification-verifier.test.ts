import { NotificationVerifier } from '../../src/verifier/notification/notification.verifier';
import { InvalidSignatureException } from '../../src/verifier/notification/exception/invalid-signature.exception';

it('Should verify notification with valid signature in response', async () => {
  // https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/notifications#securing-callbacks
  const mockedRequest = {
    status: 200,
    headers: {
      get: () => {
        return '6yQRl17CNj5YSHSpF+tLjb0vVsNVEv021Tyy1bTVEQ69SWlmhwmJYuMc7jiDyeW9TLy4vRqSh4g4YEyN8eoQIM57pMoNw6Lw6Oudubqwp+E3cKtLFxW0l18db3Z/vhxn5BScAutHWwT/XrmkCNaHyCsvOOGMekwrNO7mxX9QIx21FBaEejJeviSYrF8bG6MbmFEs2VGKSybf9YrElR8BxxNe/uNfCXN3P5tO8MgR5wlL3Kr4yq8e6i4WWJgD08IVTnrSnoZR6v8JkPA+fn7I0M6cy0Xzw3BRMJAvdQB97wkobu97gFqJFKsOH2u/JR1S/UNP26vL0mzuAVuKAUwlRn0SUhWEAgcM3X0UCtWLYfCIb5QqrSHwlp7lwOkVnFt329Mrpjy+jAfYYSRqzIsw4ZsRRVauy/v3CvmjPI9sUKiJ5l1FSgkpK2lkjhFgKB3WaYZWy9ZfIAI9bDyG8vSTT7IDurlUhyTweDqVNlYUsO6jaUa4KmSpg1o9eIeHxm0XBQ2c0Lv/T39KNc/VOAi1LBfPiQYMXD1e/8VuPPBTDGgzOMD3i334ppSr36+8YtApAn3D36Hr9jqAfFrugM7uPecjCGuleWsHFyNnJErT0/amIt24Nh1GoiESEq42o7Co4wZieKZ+/yeAlIUErJzK41ACVGmTnGoDUwEBXxADOdA=';
      },
    },
    json: async () => {
      return {
        order: {
          id: null,
          created_at: null,
          status: 'completed',
          event: null,
          total_btc: { cents: 100000000, currency_iso: 'BTC' },
          total_native: { cents: 1000, currency_iso: 'USD' },
          total_payout: { cents: 1000, currency_iso: 'USD' },
          custom: '123456789',
          receive_address: 'mzVoQenSY6RTBgBUcpSBTBAvUMNgGWxgJn',
          button: {
            type: 'buy_now',
            name: 'Test Item',
            description: null,
            id: null,
          },
          transaction: {
            id: '53bdfe4d091c0d74a7000003',
            hash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
            confirmations: 0,
          },
        },
      };
    },
  };

  const notificationVerifier = new NotificationVerifier();
  await notificationVerifier.verify(mockedRequest as unknown as Request);
});

it('Should throw error because of invalid signature in response', async () => {
  const mockedRequest = {
    status: 200,
    headers: {
      get: () => {
        return 'JBFeNj5YSHQXSy9WVRI2PNW0EQ5JaWYJYhw4TBo4YEwQIHsKw6Lrnbk3cEsXFV8db3Z/HGcUAkdbBF4I1ocrLzh6TCs0f1AjHRQWejJeJF8bGxtRLFFLJsSVHwETXl8Jc3c/ThEJS9yqyq8eLhZYAxVOetKeUQk+fn7OnEVwUTAvde+/vX0JKG57WhQOH2slHVJDT9urbAFbAUwlRn0SUhUCBwx9FArVi2FvKiEVW3crPAdhJGrMizARRVYKPGxQXUVKCSkraWQRYCgdaVZfIAI9bDxPA1QkeDo2VhRpRipkWj14bRcFCtC7T39KNTgILBfPiQYMXD1ebjxTDGgzOH3fr2IpAn3foTp8Wj0jCGt5awcXI2ckSiLduDYdRiESEjYGYnh+JwRQAlRpagMBAV8QAzk=';
      },
    },
    json: async () => {
      return {
        order: {
          id: null,
          created_at: null,
          status: 'completed',
          event: null,
          total_btc: { cents: 100000000, currency_iso: 'BTC' },
          total_native: { cents: 1000, currency_iso: 'USD' },
          total_payout: { cents: 1000, currency_iso: 'USD' },
          custom: '123456789',
          receive_address: 'mzVoQenSY6RTBgBUcpSBTBAvUMNgGWxgJn',
          button: {
            type: 'buy_now',
            name: 'Test Item',
            description: null,
            id: null,
          },
          transaction: {
            id: '53bdfe4d091c0d74a7000003',
            hash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
            confirmations: 0,
          },
        },
      };
    },
  };

  const notificationVerifier = new NotificationVerifier();
  let actualException = null;

  try {
    await notificationVerifier.verify(mockedRequest as unknown as Request);
  } catch (exception) {
    actualException = exception;
  }

  expect(actualException).toBeInstanceOf(InvalidSignatureException);
});
