import { h, FunctionComponent } from 'preact'
import { mount, shallow, ReactWrapper } from 'enzyme'

import MockedLocalised from '~jest/MockedLocalised'
import MockedReduxProvider from '~jest/MockedReduxProvider'
import withTheme from '../index'

const DummyComponent: FunctionComponent = () => <span>Dummy component</span>
const WrappedComponent = withTheme(DummyComponent)

describe('CameraPermissions', () => {
  describe('Primer', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('renders without crashing', () => {
      const wrapper = shallow(
        <MockedReduxProvider>
          <MockedLocalised>
            <WrappedComponent />
          </MockedLocalised>
        </MockedReduxProvider>
      )
      expect(wrapper.exists()).toBeTruthy()
    })

    describe('when mounted', () => {
      let wrapper: ReactWrapper

      beforeEach(() => {
        wrapper = mount(
          <MockedReduxProvider>
            <MockedLocalised>
              <WrappedComponent />
            </MockedLocalised>
          </MockedReduxProvider>
        )
      })

      it('renders NavigationBar correctly', () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.find('NavigationBar').exists()).toBeTruthy()
        expect(
          wrapper.find('NavigationBar button > .iconBack').exists()
        ).toBeTruthy()
        expect(wrapper.find('NavigationBar button').text()).toEqual(
          'generic.back'
        )
      })

      it('render wrapped component correctly', () => {
        expect(wrapper.find('.content > DummyComponent').exists()).toBeTruthy()
        expect(
          wrapper.find('DummyComponent').prop('hideOnfidoLogo')
        ).toBeTruthy()
        expect(wrapper.find('DummyComponent').prop('cobrand')).toBeNull()
      })
    })

    describe('with custom globals state', () => {
      let wrapper: ReactWrapper

      beforeEach(() => {
        wrapper = mount(
          <MockedReduxProvider
            overrideGlobals={{
              hideOnfidoLogo: false,
              cobrand: { text: 'Fake brand' },
            }}
          >
            <MockedLocalised>
              <WrappedComponent />
            </MockedLocalised>
          </MockedReduxProvider>
        )
      })

      it('render wrapped component correctly', () => {
        expect(
          wrapper.find('DummyComponent').prop('hideOnfidoLogo')
        ).toBeFalsy()
        expect(wrapper.find('DummyComponent').prop('cobrand')).toMatchObject({
          text: 'Fake brand',
        })
      })
    })
  })
})