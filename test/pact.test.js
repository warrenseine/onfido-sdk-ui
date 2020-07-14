import { Pact } from '@pact-foundation/pact';

describe('SDK Consumer Pact Tests', () => {
  let provider = null;

  beforeAll(async () => {
    provider = new Pact({
      consumer: 'JS SDK',
      provider: 'SDKToken',
      port: 5679,
      pactfileWriteMode: 'update'
    });
    await provider.setup();
  });

  describe('get applicant id', () => {
    test('get applicant id', async () => {
      await provider.addInteraction({
        uponReceiving: 'a request for all queues',
        withRequest: {
          method: 'GET',
          path: '/sdk_token',
          headers: {
            Accept: '*/*',
            Authorization: 'BASIC NA',
          },
        },
        willRespondWith: {
          status: 200,
        },
      });
    });
  });
});
