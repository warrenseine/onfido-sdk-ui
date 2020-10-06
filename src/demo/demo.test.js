import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'

describe('Mounting the Demo App', () => {
  let Demo = null

  beforeEach(() => (Demo = require('./demo.js')))

  describe('by mocking Onfido SDK', () => {
    global.Onfido = {
      init: () => {},
    }

    it('renders the Onfido Demo without crashing', () => {
      // the component needs to be assigned to a lowercase variable to work!
      const sdk = <Demo />
      const sdkDemo = mount(<sdk />)
      expect(sdkDemo).to.be.ok
    })
  })

  describe('without mocking Onfido SDK', () => {
    it('renders the Onfido Demo without crashing', () => {
      // the component needs to be assigned to a lowercase variable to work!
      const sdk = <Demo />
      const sdkDemo = mount(<sdk />)
      expect(sdkDemo).to.be.ok
    })
  })
})
