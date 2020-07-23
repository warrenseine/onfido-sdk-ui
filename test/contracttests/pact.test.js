const path = require("path")
const chai = require("chai")
// const { Pact, Matchers } = require("@pact-foundation/pact")
const { Pact } = require("@pact-foundation/pact")
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect
chai.use(chaiAsPromised)
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5555/sdk_token";
import { doesNotMatch } from 'assert'
//const { after } = require("mocha")
//const { string } = Matchers

const get = require('/Users/bart.ziemba/Projects/onfido-sdk-ui/test/contracttests/get.js')

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

  beforeAll(() => provider.setup()
  .then(() => provider.addInteraction({
    state: "user token",
    uponReceiving: "GET applicant_id",
    withRequest: {
      method: "GET",
      path: "/sdk_token",
      headers: { "content-type": "application/json", Referer: "onfido.surge.sh", authorization: "BASIC ONLY_TO_BE_USED_BY_ONFIDO" }
    },
    willRespondWith: {
      status: 200,
      headers: { "content-type": "application/json" }
    }
  })))

  it('OK response', () => {

    get()
    .then((response) => {
      expect(response.statusText).to.be.equal('OK')
      console.log("END OF GET")
      done();
    })

  })
  afterEach(() => { provider.verify() })

  afterAll(() => { provider.finalize() })

})

// function getSdkToken() {
  //   return axios.get('http://localhost:2222/sdk_token', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Referer': 'onfido.surge.sh',
  //       'authorization': 'BASIC ONLY_TO_BE_USED_BY_ONFIDO'
  //     }
  //   })
  // }

    // axios({
    //   method: 'get',
    //   url: 'http://localhost:2222/sdk_token',
    //   headers: {
    //     'content-type': 'application/json',
    //     'Referer': 'onfido.surge.sh',
    //     'authorization': 'BASIC ONLY_TO_BE_USED_BY_ONFIDO'
    //   }
    // })
    // axios.get('http://localhost:6666/sdk_token', {
    //   headers: {
    //     'content-type': 'application/json',
    //     'Referer': 'onfido.surge.sh',
    //     'authorization': 'BASIC ONLY_TO_BE_USED_BY_ONFIDO'
    //   }
    // })