const path = require('path')
const expect = require('chai').expect;
import {describe, it} from '../utils/mochaw'

const options = {
  pageObjects: ['DocumentSelection', 'Welcome', 'DocumentUpload', 'DocumentUploadConfirmation', 'CrossDeviceIntro']
}

const localhostUrl = 'https://localhost:8080/'

describe('Happy Paths',options, ({driver,$,pageObjects}) => {
  const {documentSelection, welcome, documentUpload, documentUploadConfirmation, crossDeviceIntro} = pageObjects

  it('test website title', async () => {
    await driver.get(localhostUrl)
    const title = await driver.getTitle();
    expect(title).to.equal('Onfido SDK Demo');
  })

  it('test welcome screen title', async () => {
    await driver.get(localhostUrl)
    const welcomeTitleText = await welcome.welcomeTitle.getText()
    expect(welcomeTitleText).to.equal('Open your new bank account');
    const welcomeTitle = await welcome.welcomeTitle.isDisplayed()
  })

  it('test welcome screen subtitle', async () => {
    await driver.get(localhostUrl)
    const welcomeSubtitleText = await welcome.welcomeSubtitle.getText()
    expect(welcomeSubtitleText).to.equal('To open a bank account, we will need to verify your identity.' + '\n' + 'It will only take a couple of minutes.');
    const welcomeSubtitle = await welcome.welcomeSubtitle.isDisplayed()
  })

  it('test verify identity button', async () => {
    await driver.get(localhostUrl)
    const verifyIdentityBtnText = await welcome.primaryBtn.getText()
    expect(verifyIdentityBtnText).to.equal('Verify Identity');
    const verifyIdentity = await welcome.primaryBtn.isDisplayed()
  })

  it('test footer is displayed', async () => {
    await driver.get(localhostUrl)
    const footer = await welcome.footer.isDisplayed()
  })

  //document selection tests
  it('test document selection title', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const documentSelectionTitleText = await documentSelection.title.getText()
    expect(documentSelectionTitleText).to.equal('Verify your identity');
    const documentSelectionTitle = await documentSelection.title.isDisplayed()
  })

  it('test document selection subtitle', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const documentSelectionSubtitleText = await documentSelection.subtitle.getText()
    expect(documentSelectionSubtitleText).to.equal('Select the type of document you would like to upload');
    const documentSelectionSubtitle = await documentSelection.subtitle.isDisplayed()
  })

  it('test passport icon presence', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const passportIcon = await documentSelection.passportIcon.isDisplayed()
  })

  it('test passport label', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const documentSelectionPassportLabelText = await documentSelection.documentSelectionLabel.getText()
    expect(documentSelectionPassportLabelText).to.equal('Passport');
    const documentSelectionPassport = await documentSelection.documentSelectionLabel.isDisplayed()
  })

  it('test passport hint', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const documentSelectionPassportHintText = await documentSelection.documentSelectionHint.getText()
    expect(documentSelectionPassportHintText).to.equal('Face photo page');
    const documentSelectionPassportHint = await documentSelection.documentSelectionHint.isDisplayed()
  })

  it('test driving licence icon presence', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const drivingLicenceIcon = await documentSelection.drivingLicenceIcon.isDisplayed()
  })

  it('test driving licence label', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const drivingLicenceLabelText = await documentSelection.drivingLicenceLabel.getText()
    expect(drivingLicenceLabelText).to.equal('Driver\'s License');
    const drivingLicenceLabel = await documentSelection.drivingLicenceLabel.isDisplayed()
  })


  it('test driving licence hint', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const drivingLicenceHintText = await documentSelection.drivingLicenceHint.getText()
    expect(drivingLicenceHintText).to.equal('Front and back');
    const drivingLicenceHint = await documentSelection.drivingLicenceHint.isDisplayed()
  })

  it('test identity card icon presence', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const identityCardIcon = await documentSelection.identityCardIcon.isDisplayed()
  })

  it('test identity card label', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const identityCardLabelText = await documentSelection.identityCardLabel.getText()
    expect(identityCardLabelText).to.equal('Identity Card');
    const identityCardLabel = await documentSelection.identityCardLabel.isDisplayed()
  })

  it('test identity card hint', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    const identityCardHintText = await documentSelection.identityCardHint.getText()
    expect(identityCardHintText).to.equal('Front and back');
    const identityCardHint = await documentSelection.identityCardHint.isDisplayed()
  })

  //document upload
  it('test document upload title for passport', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const passportTitleText = await documentUpload.title.getText()
    expect(passportTitleText).to.equal('Passport photo page');
    const passportTitle = await documentUpload.title.isDisplayed()

  })

  it('test cross device icon presence', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const crossDeviceIcon = await documentUpload.crossDeviceIcon.isDisplayed()
  })

  it('test cross device header', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const crossDeviceHeaderText = await documentUpload.crossDeviceHeader.getText()
    expect(crossDeviceHeaderText).to.equal('Need to use your mobile to take photos?');
    const crossDeviceHeader = await documentUpload.crossDeviceHeader.isDisplayed()
  })

  it('test cross device submessage', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const crossDeviceSubMessageText = await documentUpload.crossDeviceSubMessage.getText()
    expect(crossDeviceSubMessageText).to.equal('Securely continue verification on your mobile');
    const crossDeviceSubMessage = await documentUpload.crossDeviceSubMessage.isDisplayed()
  })

  it('test cross device arrow presence', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const crossDeviceArrow = await documentUpload.crossDeviceArrow.isDisplayed()
  })

  it('test uploader icon presence', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const uploaderIcon = await documentUpload.uploaderIcon.isDisplayed()
  })

  it('test uploader instruction', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const uploaderInstructionsMessageText = await documentUpload.uploaderInstructionsMessage.getText()
    expect(uploaderInstructionsMessageText).to.equal('Upload passport photo page from your computer');
    const uploaderInstructionsMessage = await documentUpload.uploaderInstructionsMessage.isDisplayed()
  })

  it('test uploader button', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const uploaderBtnText = await documentUpload.uploaderBtn.getText()
    expect(uploaderBtnText).to.equal('Upload file');
    const uploaderBtn = await documentUpload.uploaderBtn.isDisplayed()
  })

  it('should upload a file', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const input = await documentUpload.upload
    await input.sendKeys(path.join(__dirname,'../../features/helpers/resources/passport.jpg'))
  })

  it('test two-sided document upload', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.drivingLicenceIcon.click()
    const uploadFront = await documentUpload.upload
    await uploadFront.sendKeys(path.join(__dirname,'../../features/helpers/resources/uk_driving_licence.png'))
    const waitForFrontUploadToFinish = await documentUploadConfirmation.waitForUploadToFinish
    await documentUploadConfirmation.confirmBtn.click()
    const uploadBack = await documentUpload.upload
    await uploadBack.sendKeys(path.join(__dirname,'../../features/helpers/resources/back_driving_licence.jpg'))
    const waitForBackUploadToFinish = await documentUploadConfirmation.waitForUploadToFinish
    const checkReadabilityText = await documentUpload.title.getText()
    expect(checkReadabilityText).to.equal('Check readability');
  })

  it('test check readability', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    const uploadFront = await documentUpload.upload
    await uploadFront.sendKeys(path.join(__dirname,'../../features/helpers/resources/uk_driving_licence.png'))
    const waitForUploadToFinish = await documentUploadConfirmation.waitForUploadToFinish
    const checkReadabilityText = await documentUpload.title.getText()
    expect(checkReadabilityText).to.equal('Check readability');
    const checkReadability = await documentUpload.title.isDisplayed()
  })


  it('test driving licence titles', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.drivingLicenceIcon.click()
    const frontOfDrivingLicenceTitle = await documentUpload.title.getText()
    expect(frontOfDrivingLicenceTitle).to.equal('Front of driver\'s license');
    const input = await documentUpload.upload
    await input.sendKeys(path.join(__dirname,'../../features/helpers/resources/uk_driving_licence.pdf'))
    const waitForUploadToFinish = await documentUploadConfirmation.waitForUploadToFinish
    await documentUploadConfirmation.confirmBtn.click()
    const backOfDrivingLicenceTitle = await documentUpload.title.getText()
    expect(backOfDrivingLicenceTitle).to.equal('Back of driver\'s license');
  })

  it('test driving licence instruction messages', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.drivingLicenceIcon.click()
    const frontOfDrivingLicenceInstructionMessage = await documentUpload.uploaderInstructionsMessage.getText()
    expect(frontOfDrivingLicenceInstructionMessage).to.equal('Upload front of license from your computer');
    const input = await documentUpload.upload
    await input.sendKeys(path.join(__dirname,'../../features/helpers/resources/uk_driving_licence.pdf'))
    const waitForUploadToFinish = await documentUploadConfirmation.waitForUploadToFinish
    await documentUploadConfirmation.confirmBtn.click()
    const backOfDrivingLicenceInstructionMessage = await documentUpload.uploaderInstructionsMessage.getText()
    expect(backOfDrivingLicenceInstructionMessage).to.equal('Upload back of license from your computer');
  })

  it('test identity card titles', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.identityCardIcon.click()
    const frontOfIdentityCardTitle = await documentUpload.title.getText()
    expect(frontOfIdentityCardTitle).to.equal('Front of identity card');
    const input = await documentUpload.upload
    await input.sendKeys(path.join(__dirname,'../../features/helpers/resources/national_identity_card.jpg'))
    const waitForUploadToFinish = await documentUploadConfirmation.waitForUploadToFinish
    await documentUploadConfirmation.confirmBtn.click()
    const backOfIdentityCardTitle = await documentUpload.title.getText()
    expect(backOfIdentityCardTitle).to.equal('Back of identity card');
  })

  it('test identity card instruction messages', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.identityCardIcon.click()
    const frontOfIdentityCardInstructionMessage = await documentUpload.uploaderInstructionsMessage.getText()
    expect(frontOfIdentityCardInstructionMessage).to.equal('Upload front of card from your computer');
    const input = await documentUpload.upload
    await input.sendKeys(path.join(__dirname,'../../features/helpers/resources/uk_driving_licence.pdf'))
    const waitForUploadToFinish = await documentUploadConfirmation.waitForUploadToFinish
    await documentUploadConfirmation.confirmBtn.click()
    const backOfIdentityCardInstructionMessage = await documentUpload.uploaderInstructionsMessage.getText()
    expect(backOfIdentityCardInstructionMessage).to.equal('Upload back of card from your computer');
  })

  // CROSS DEVICE INTRO
  it('test cross device intro screen title text', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    await documentUpload.crossDeviceIcon.click()
    const continueVerificationOnMobileTitleText = await crossDeviceIntro.crossDeviceIntroTitle.getText()
    expect(continueVerificationOnMobileTitleText).to.equal('Continue verification on your mobile');
    const continueVerificationOnMobileTitle = await crossDeviceIntro.crossDeviceIntroTitle.isDisplayed()
  })

  it('test cross device intro icons presence', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    await documentUpload.crossDeviceIcon.click()
    const smsIcon = await crossDeviceIntro.smsIcon.isDisplayed()
    const takePhotosIcon = await crossDeviceIntro.takePhotosIcon.isDisplayed()
    const returnToComputerIcon = await crossDeviceIntro.returnToComputerIcon.isDisplayed()
  })

  it('test cross device intro messages texts', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    await documentUpload.crossDeviceIcon.click()
    const smsMessageText = await crossDeviceIntro.smsMessage.getText()
    expect(smsMessageText).to.equal('We\’ll SMS a secure link to your mobile (no app download required)');
    const smsMessage = await crossDeviceIntro.smsMessage.isDisplayed()
    const takePhotosMessageText = await crossDeviceIntro.takePhotosMessage.getText()
    expect(takePhotosMessageText).to.equal('We\’ll walk you through taking the photos');
    const takePhotosMessage = await crossDeviceIntro.takePhotosMessage.isDisplayed()
    const returnToComputerMessageText = await crossDeviceIntro.returnToComputerMessage.getText()
    expect(returnToComputerMessageText).to.equal('Return to your computer to complete your verification');
    const returnToComputerMessage = await crossDeviceIntro.returnToComputerMessage.isDisplayed()
  })

  it('test cross device intro button text', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passportIcon.click()
    await documentUpload.crossDeviceIcon.click()
    const letsStartButtonText = await crossDeviceIntro.letsStartButton.getText()
    expect(letsStartButtonText).to.equal('Let\’s start');
    const letsStartButton = await crossDeviceIntro.letsStartButton.isDisplayed()
  })

  //CROSS DEVICE SCREEN TESTS

})
