import { expect } from 'chai'
import { describe, it } from '../../utils/mochaw'
import { localhostUrl } from '../../config.json'

const options = {
  pageObjects: ['BasePage', 'Welcome'],
}

const percySnapshot = require('@percy/selenium-webdriver')

export const percyScenarios = async (lang = 'en_US') => {
  describe(`PERCY scenarios in ${lang}`, options, ({ driver, pageObjects }) => {
    const { welcome } = pageObjects
    it('should verify website title', async () => {
      driver.get(`${localhostUrl}?language=${lang}`)
      //driver.get('https://www.google.com')
      const title = driver.getTitle()
      await percySnapshot(driver, 'Onfido SDK Demo Homepage')
      expect(title).to.equal('Onfido SDK Demo')
    })
  })
}
