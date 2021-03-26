import { describe } from '../utils/mochaw'
import { supportedLanguages, fullTestCoverageLanguages } from '../config.json'
import { welcomeScenarios } from './scenarios/welcome'
import { documentSelectorScenarios } from './scenarios/documentSelector'
import { countrySelectorScenarios } from './scenarios/countrySelector'
import { documentScenarios } from './scenarios/document'
import { faceScenarios } from './scenarios/face'
import { crossDeviceScenarios } from './scenarios/crossDevice'
import { modalScenarios } from './scenarios/modal'
import { navigationScenarios } from './scenarios/navigation'
import { proofOfAddressScenarios } from './scenarios/proofOfAddress'
import { hostAppHistoryScenarios } from './scenarios/hostAppHistory'
import { accessibilityScenarios } from './scenarios/accessibility'
import { userConsentScenarios } from './scenarios/userConsent'

describe('BS Happy Paths on Safari', () => {
  // Multiple language scenarios
  fullTestCoverageLanguages.forEach((lang) => {
    welcomeScenarios(lang) //fails .. welcome.verifySubtitle(copy) ...seems like Safari renders it on 1 line
    documentSelectorScenarios(lang) //pass
    countrySelectorScenarios(lang) //some failing intermittently..locally, but all ok on BS!
    documentScenarios(lang) //about 5 fail, intermittently...no real consistency...needs investigation
    faceScenarios(lang) // 2 failing....should complete the flow when snapshot is disabled, should take one selfie using the camera stream .... need to allow camera
    crossDeviceScenarios(lang) //....last 10 fail
    modalScenarios(lang) //pass ok
    navigationScenarios(lang) //pass ok
  })
  // Note: The SDK works also with language tags that do not include region (e.g. 'en', 'es')
  // We are passing the region here so we can fetch the right json file path (e.g. `en_US/en_US.json`).
  supportedLanguages.forEach((lang) => {
    welcomeScenarios(lang) //pass ok
  })
  // PoA is only available in en
  proofOfAddressScenarios() //last one fails
  accessibilityScenarios() //one failure ... should verify accessibility for the cross device mobile connected screen
  hostAppHistoryScenarios() //pass ok
  userConsentScenarios() //all pass ok
})
