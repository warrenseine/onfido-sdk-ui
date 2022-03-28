import { h, FunctionComponent } from 'preact'
import { UserConsentContext } from '~contexts/useUserConsent'
import Mock = jest.Mock

type MockedUserConsentProviderProps = {
  onGrantConsents: Mock<any, any>
}

const MockedUserConsentProvider: FunctionComponent<MockedUserConsentProviderProps> = ({
  children,
  onGrantConsents,
}) => (
  <UserConsentContext.Provider
    value={{
      enabled: true,
      consents: [],
      grantConsents: () => Promise.resolve().then(onGrantConsents),
    }}
  >
    {children}
  </UserConsentContext.Provider>
)

export default MockedUserConsentProvider
