import { h } from 'preact'
import { mount, shallow } from 'enzyme'

import ReloadContent from '../ReloadContent'
import MockedLocalised from '~jest/MockedLocalised'

const defaultProps = {
  onPrimaryButtonClick: jest.fn(),
}

describe('ReloadContent', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <MockedLocalised>
        <ReloadContent {...defaultProps} />
      </MockedLocalised>
    )
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('when mounted', () => {
    it('renders without crashing and with "Reload Screen" Button element', () => {
      const wrapper = mount(
        <MockedLocalised>
          <ReloadContent {...defaultProps} />
        </MockedLocalised>
      )
      const reloadScreenBtn = wrapper.find({
        'data-onfido-qa': 'userConsentReloadScreenBtn',
      })

      expect(wrapper.exists()).toBeTruthy()
      expect(reloadScreenBtn.exists()).toBeTruthy()
    })
  })
})
