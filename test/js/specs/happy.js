const path = require('path')
const chai = require('chai');
const { assert } = require('chai');
var webdriver = require('selenium-webdriver');
const expect = require('chai').expect;
import {describe, it} from '../utils/mochaw'

const options = {
  pageObjects: ['DocumentSelection', 'Welcome', 'DocumentUpload']
}

describe('Happy Paths',options, ({driver,$,pageObjects}) => {
  const {documentSelection, welcome, documentUpload} = pageObjects

  it('test website title', async () => {
    await driver.get('https://localhost:8080/')
    const title = await driver.getTitle();
    expect(title).to.equal('Onfido SDK Demo');
  })

  it('test welcome screen title', async () => {
    await driver.get('https://localhost:8080/')
    const welcometitle = await welcome.welcometitle.getText()
    expect(welcometitle).to.equal('Open your new bank account');
  })

  it('should upload a file', async () => {
    console.log("testing")
    await driver.get('https://localhost:8080/')
    await welcome.primaryBtn.click()
    await documentSelection.passport.click()
    const input = await documentUpload.upload
    await input.sendKeys(path.join(__dirname,'../../features/helpers/resources/passport.jpg'))
  })
})
