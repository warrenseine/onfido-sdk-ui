import { describe, it } from '../../utils/mochaw'
import { localhostUrl } from '../../config.json'
import {
  takePercySnapshot,
  uploadFileAndClickConfirmButton,
} from './sharedFlows.js'
import { assert } from 'chai'

const options = {
  pageObjects: [
    'Welcome',
    'Confirm',
    'DocumentSelector',
    'CountrySelector',
    'PassportUploadImageGuide',
    'DocumentUpload',
    'CrossDeviceIntro',
    'CrossDeviceLink',
    'CrossDeviceMobileConnected',
    'CrossDeviceClientIntro',
    'CrossDeviceClientSuccess',
    'CrossDeviceSubmit',
    'PoaDocumentSelection',
    'PoaGuidance',
    'PoaIntro',
    'VerificationComplete',
    'BasePage',
  ],
}

export const proofOfAddressScenarios = async (lang = 'en_US') => {
  describe(
    `PROOF OF ADDRESS scenarios in ${lang}`,
    options,
    ({ driver, pageObjects }) => {
      const {
        welcome,
        confirm,
        documentSelector,
        countrySelector,
        passportUploadImageGuide,
        documentUpload,
        crossDeviceIntro,
        crossDeviceLink,
        crossDeviceMobileConnected,
        crossDeviceClientIntro,
        crossDeviceClientSuccess,
        crossDeviceSubmit,
        poaDocumentSelection,
        poaGuidance,
        poaIntro,
        verificationComplete,
        basePage,
      } = pageObjects

      const copy = basePage.copy(lang)

      const goToPoADocumentSelectionScreen = async () => {
        driver.get(`${localhostUrl}?poa=true&useUploader=true`)
        welcome.continueToNextStep()
        poaIntro.clickStartVerificationButton()
      }

      it('should verify UI elements of PoA Intro screen @percy', async () => {
        driver.get(`${localhostUrl}?poa=true`)
        welcome.continueToNextStep()
        poaIntro.verifyTitle('Let’s verify your UK address')
        poaIntro.verifyRequirementsHeader(copy)
        poaIntro.verifyFirstRequirement('Shows your current address')
        poaIntro.verifySecondRequirement(
          'Matches the address you used on signup'
        )
        poaIntro.verifyThirdRequirement('Is your most recent document')
        poaIntro.verifyStartVerificationButton(copy)
        await takePercySnapshot(
          driver,
          `Should verify UI elements of PoA Intro screen`
        )
      })

      it('should verify UI elements of PoA Document Selection screen @percy', async () => {
        goToPoADocumentSelectionScreen()
        poaDocumentSelection.verifyTitle('Select a UK document')
        poaDocumentSelection.verifySubtitle(copy)
        poaDocumentSelection.verifyElementsBankCell(copy)
        poaDocumentSelection.verifyElementsUtilityBillCell(copy)
        poaDocumentSelection.verifyElementsCouncilTaxLetter(copy)
        poaDocumentSelection.verifyElementsBenefitsLetter(copy)
        await takePercySnapshot(driver, 'Select a UK document screen')
      })

      it('should verify UI elements of PoA Guidance for Bank Statement @percy', async () => {
        goToPoADocumentSelectionScreen()
        poaDocumentSelection.clickOnBankIcon()
        poaGuidance.verifyCopiesOnPoADocumentsGuidanceScreen(
          copy,
          'bank_building_society_statement'
        )
        poaGuidance.verifyTextOfTheElementsForPoADocumentsGuidance(3)
        await takePercySnapshot(driver, 'Submit Statement screen')
      })

      it('should verify UI elements of PoA Guidance for Utility Bill @percy', async () => {
        goToPoADocumentSelectionScreen()
        poaDocumentSelection.clickOnUtilityBillIcon()
        poaGuidance.verifyCopiesOnPoADocumentsGuidanceScreen(
          copy,
          'utility_bill'
        )
        poaGuidance.verifyTextOfTheElementsForPoADocumentsGuidance(3)
        await takePercySnapshot(driver, 'Submit bill screen')
      })

      it('should verify UI elements of PoA Guidance for Council Tax Letter @percy', async () => {
        goToPoADocumentSelectionScreen()
        poaDocumentSelection.clickOnCouncilTaxLetterIcon()
        poaGuidance.verifyCopiesOnPoADocumentsGuidanceScreen(
          copy,
          'council_tax'
        )
        poaGuidance.verifyTextOfTheElementsForPoADocumentsGuidance(12)
        await takePercySnapshot(driver, 'Submit council tax letter screen')
      })

      it('should verify UI elements of PoA Guidance for Benefits Letter @percy', async () => {
        goToPoADocumentSelectionScreen()
        poaDocumentSelection.clickOnBenefitsLetterIcon()
        poaGuidance.verifyCopiesOnPoADocumentsGuidanceScreen(
          copy,
          'benefit_letters'
        )
        poaGuidance.verifyTextOfTheElementsForPoADocumentsGuidance(12)
        await takePercySnapshot(driver, 'Submit benefit letter screen')
      })

      it("should skip country selection screen with a preselected driver's license document type on PoA flow @percy ", async () => {
        driver.get(`${localhostUrl}?poa=true&oneDoc=driving_licence`)
        welcome.continueToNextStep()
        poaIntro.clickStartVerificationButton()
        poaDocumentSelection.clickOnCouncilTaxLetterIcon()
        poaGuidance.clickOnContinueButton()
        await takePercySnapshot(driver, 'Submit letter upload screen')
        documentUpload.clickUploadButtonIfRemoteIe()
        uploadFileAndClickConfirmButton(
          documentUpload,
          confirm,
          'uk_driving_licence.png'
        )
        documentUpload.verifyFrontOfDrivingLicenceTitle(copy)
      })

      it('should upload Bank Statement and finish flow @skip-for-ie', async () => {
        goToPoADocumentSelectionScreen()
        poaDocumentSelection.clickOnBankIcon()
        poaGuidance.clickOnContinueButton()
        documentUpload.clickUploadButtonIfRemoteIe()
        uploadFileAndClickConfirmButton(
          documentUpload,
          confirm,
          'national_identity_card.pdf'
        )
        documentSelector.clickOnPassportIcon()
        documentUpload.clickUploadButton()
        uploadFileAndClickConfirmButton(
          passportUploadImageGuide,
          confirm,
          'passport.jpg'
        )
        uploadFileAndClickConfirmButton(documentUpload, confirm, 'face.jpeg')
        verificationComplete.verifyUIElements(copy)
      })

      it('should upload Utility Bill and finish flow @skip-for-ie', async () => {
        goToPoADocumentSelectionScreen()
        poaDocumentSelection.clickOnUtilityBillIcon()
        poaGuidance.clickOnContinueButton()
        uploadFileAndClickConfirmButton(
          documentUpload,
          confirm,
          'national_identity_card.pdf'
        )
        documentSelector.clickOnPassportIcon()
        documentUpload.clickUploadButton()
        uploadFileAndClickConfirmButton(
          passportUploadImageGuide,
          confirm,
          'passport.jpg'
        )
        uploadFileAndClickConfirmButton(documentUpload, confirm, 'face.jpeg')
        verificationComplete.verifyUIElements(copy)
      })

      it('should upload Council Tax Letter and finish flow @skip-for-ie', async () => {
        goToPoADocumentSelectionScreen()
        poaDocumentSelection.clickOnCouncilTaxLetterIcon()
        poaGuidance.clickOnContinueButton()
        uploadFileAndClickConfirmButton(
          documentUpload,
          confirm,
          'national_identity_card.pdf'
        )
        documentSelector.clickOnDrivingLicenceIcon()
        countrySelector.selectSupportedCountry()
        countrySelector.clickSubmitDocumentButton()
        uploadFileAndClickConfirmButton(
          documentUpload,
          confirm,
          'uk_driving_licence.png'
        )
        uploadFileAndClickConfirmButton(
          documentUpload,
          confirm,
          'back_driving_licence.jpg'
        )
        uploadFileAndClickConfirmButton(documentUpload, confirm, 'face.jpeg')
        verificationComplete.verifyUIElements(copy)
      })

      it('should upload Benefits Letter and finish flow @skip-for-ie', async () => {
        goToPoADocumentSelectionScreen()
        poaDocumentSelection.clickOnBenefitsLetterIcon()
        poaGuidance.clickOnContinueButton()
        uploadFileAndClickConfirmButton(
          documentUpload,
          confirm,
          'national_identity_card.pdf'
        )
        documentSelector.clickOnPassportIcon()
        documentUpload.clickUploadButton()
        uploadFileAndClickConfirmButton(
          passportUploadImageGuide,
          confirm,
          'passport.jpg'
        )
        uploadFileAndClickConfirmButton(documentUpload, confirm, 'face.jpeg')
        verificationComplete.verifyUIElements(copy)
      })

      it('should succesfully complete cross device e2e flow with PoA document and selfie upload @percy @skip-for-ie', async () => {
        const copyCrossDeviceLinkAndOpenInNewTab = async () => {
          const crossDeviceLinkText = crossDeviceLink
            .copyLinkTextContainer()
            .getText()
          driver.executeScript("window.open('your url','_blank');")
          switchBrowserTab(1)
          driver.get(crossDeviceLinkText)
        }

        const switchBrowserTab = async (tab) => {
          const browserWindows = driver.getAllWindowHandles()
          driver.switchTo().window(browserWindows[tab])
        }

        goToPoADocumentSelectionScreen()
        poaDocumentSelection.clickOnBankIcon()
        poaGuidance.clickOnContinueButton()
        documentUpload.switchToCrossDevice()
        crossDeviceIntro.continueToNextStep()
        assert.isTrue(
          crossDeviceLink.qrCode().isDisplayed(),
          'Test Failed: QR Code should be visible'
        )
        crossDeviceLink.switchToCopyLinkOption()
        crossDeviceLink.verifyCopyLinkTextContainer()
        copyCrossDeviceLinkAndOpenInNewTab()
        assert.isTrue(
          crossDeviceClientIntro.title().isDisplayed(),
          'Test Failed: Cross Device Client Session Intro title should be visible'
        )
        switchBrowserTab(0)
        crossDeviceMobileConnected.tipsHeader().isDisplayed()
        await takePercySnapshot(driver, 'Connected to your mobile screen')
        switchBrowserTab(1)
        crossDeviceClientIntro.continueToNextStep()
        await takePercySnapshot(driver, 'Submit PoA bank statement')
        documentUpload.uploaderBtn().isDisplayed()
        uploadFileAndClickConfirmButton(documentUpload, confirm, 'passport.jpg')
        documentSelector.clickOnPassportIcon()
        documentUpload.clickUploadButton()
        uploadFileAndClickConfirmButton(
          passportUploadImageGuide,
          confirm,
          'passport.jpg'
        )
        uploadFileAndClickConfirmButton(documentUpload, confirm, 'face.jpeg')
        crossDeviceClientSuccess.verifyUIElements(copy)
        switchBrowserTab(0)
        crossDeviceSubmit.documentUploadedMessage().isDisplayed()
        await takePercySnapshot(
          driver,
          'Cross Device - Submit Verification screen'
        )
        crossDeviceSubmit.clickOnSubmitVerificationButton()
        verificationComplete.verifyUIElements(copy)
      })
    }
  )
}
