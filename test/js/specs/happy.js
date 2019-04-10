const path = require('path')
const expect = require('chai').expect;
import {describe, it} from '../utils/mochaw'

const options = {
  pageObjects: ['DocumentSelection', 'Welcome', 'DocumentUpload']
}

const localhostUrl = 'https://localhost:8080/'

describe('Happy Paths',options, ({driver,$,pageObjects}) => {
  const {documentSelection, welcome, documentUpload} = pageObjects

  it('test website title', async () => {
    await driver.get(localhostUrl)
    const title = await driver.getTitle();
    expect(title).to.equal('Onfido SDK Demo');
  })

  it('test welcome screen title', async () => {
    await driver.get(localhostUrl)
    const welcomeTitle = await welcome.welcomeTitle.getText()
    expect(welcomeTitle).to.equal('Open your new bank account');
  })

  it('test welcome screen subtitle', async () => {
    await driver.get(localhostUrl)
    const welcomeSubtitle = await welcome.welcomeSubtitle.getText()
    expect(welcomeSubtitle).to.equal('To open a bank account, we will need to verify your identity.' + '\n' + 'It will only take a couple of minutes.');
  })

  it('test verifi identity button text', async () => {
    await driver.get(localhostUrl)
    const verifyIdentityBtn = await welcome.primaryBtn.getText()
    expect(verifyIdentityBtn).to.equal('Verify Identity');
  })

  it('test footer is displayed', async () => {
    await driver.get(localhostUrl)
    const footer = await welcome.footer.isDisplayed()
  })

  it('should upload a file', async () => {
    await driver.get(localhostUrl)
    await welcome.primaryBtn.click()
    await documentSelection.passport.click()
    const input = await documentUpload.upload
    await input.sendKeys(path.join(__dirname,'../../features/helpers/resources/passport.jpg'))
  })
})
