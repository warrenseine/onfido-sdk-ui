const path = require("path")
const chai = require("chai")
// const { Pact, Matchers } = require("@pact-foundation/pact")
const { Pact, Matchers } = require("@pact-foundation/pact")
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect
chai.use(chaiAsPromised)
const { get } = require('axios')
import axios from 'axios';
const { after } = require("mocha")
const { string } = Matchers

// const get = require('../test/contracttests/get')

describe('Consumer Test', () => {
  const provider = new Pact({
    consumer: "JS SDK",
    provider: "Token Factory",
    port: 5555,
    log: path.resolve(process.cwd(), './test/contracttests/logs', 'pact.log'),
    dir: path.resolve(process.cwd(), './test/contracttests/pacts'),
    logLevel: "INFO",
    pactfileWriteMode: 'update'
  });

  beforeEach(() => provider.setup()
  .then(() => provider.addInteraction({
    state: "user token",
    uponReceiving: "GET applicant_id",
    withRequest: {
      method: "GET",
      path: "/sdk_token",
      headers: { Referer: "onfido.surge.sh", authorization: "BASIC ONLY_TO_BE_USED_BY_ONFIDO" }
    },
    willRespondWith: {
      status: 200,
      headers: { "content-type": "application/json" }
    }
  })))

function getSdkToken() {
  return axios.get('http://localhost:5555/sdk_token', headers)
}

  it('OK response', () => {
  getSdkToken()    
  .then((response) => {
      expect(response.statusText).to.be.equal('OK')
    })
  })

  afterEach(() => { provider.verify() })

  afterAll(() => { provider.finalize() })

})