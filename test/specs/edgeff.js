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

describe('BS Happy Paths on Edge and Firefox', () => {
  // Multiple language scenarios
  fullTestCoverageLanguages.forEach((lang) => {
    welcomeScenarios(lang) //pass ok
    documentSelectorScenarios(lang) //pass ok
    countrySelectorScenarios(lang) //pass ok
    documentScenarios(lang) //last 3 fail.
    faceScenarios(lang) //none of these work ... due to not being able to get to the selfie screen.
    crossDeviceScenarios(lang) //....last 10 fail
    modalScenarios(lang) //pass ok
    navigationScenarios(lang) //all fail
  })
  // Note: The SDK works also with language tags that do not include region (e.g. 'en', 'es')
  // We are passing the region here so we can fetch the right json file path (e.g. `en_US/en_US.json`).
  supportedLanguages.forEach((lang) => {
    welcomeScenarios(lang) //pass ok
  })
  // PoA is only available in en
  proofOfAddressScenarios() //these are failing due to user being redirected to another ui flow ... send me to get secure link page?
  accessibilityScenarios() //11 failures for FF on BS, all pass on FF locally, 7 failures on Edge.
  hostAppHistoryScenarios() //seems to fail to selfie upload, or anything to do with face.jpeg
  userConsentScenarios() //pass ok
})
