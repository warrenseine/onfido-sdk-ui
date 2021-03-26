import { expect } from 'chai'
import { describe, it } from '../../utils/mochaw'
import { localhostUrl } from '../../config.json'

const options = {
  pageObjects: ['BasePage', 'Welcome'],
}

const percySnapshot = require('@percy/selenium-webdriver')

export const welcomeScenarios = async (lang) => {
  describe(
    `WELCOME scenarios in ${lang}`,
    options,
    ({ driver, pageObjects }) => {
      const { welcome } = pageObjects
      const copy = welcome.copy(lang)

      it('should verify website title', async () => {
        driver.get(`${localhostUrl}?language=${lang}`)
        const title = driver.getTitle()
        expect(title).to.equal('Onfido SDK Demo')
        await percySnapshot(driver, 'Onfido SDK Demo Homepage')
        //driver.executeScript(
        //  'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "some reason"}}'
        //)
      })

      it('should verify UI elements on the welcome screen', async () => {
        driver.get(`${localhostUrl}?language=${lang}`)
        welcome.verifyTitle(copy)
        welcome.verifySubtitle(copy)
        welcome.verifyIdentityButton(copy)
        welcome.verifyFooter(copy)
      })
    }
  )
}
