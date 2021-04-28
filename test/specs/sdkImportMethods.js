import { describe } from '../utils/mochaw'
import { welcomeScenarios } from './scenarios/welcome'
import { documentSelectorScenarios } from './scenarios/documentSelector'
import { countrySelectorScenarios } from './scenarios/countrySelector'
import { documentScenarios } from './scenarios/document'
import { faceScenarios } from './scenarios/face'
import { crossDeviceScenarios } from './scenarios/crossDevice'
import { modalScenarios } from './scenarios/modal'
import { navigationScenarios } from './scenarios/navigation'
import { proofOfAddressScenarios } from './scenarios/proofOfAddress'
import { userConsentScenarios } from './scenarios/userConsent'

describe('Happy Paths on Chrome for import integrations', () => {
  // Only test for default language (US English)
  welcomeScenarios()
  documentSelectorScenarios()
  countrySelectorScenarios()
  documentScenarios()
  faceScenarios()
  crossDeviceScenarios()
  modalScenarios()
  navigationScenarios()
  proofOfAddressScenarios()
  userConsentScenarios()
})
