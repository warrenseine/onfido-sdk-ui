import BasePage from './BasePage.js'
import { verifyElementCopy } from '../utils/mochaw'

class VerificationComplete extends BasePage {
  wait = true
  get icon() { return this.$('.onfido-sdk-ui-Theme-icon', this.wait)}
  get backArrow() { return this.$('.onfido-sdk-ui-NavigationBar-iconBack')}

  async verifyUIElements(copy) {
    const verificationCompleteStrings = copy.complete
    this.icon.isDisplayed()
    verifyElementCopy(this.title, verificationCompleteStrings.message)
    verifyElementCopy(this.subtitle, verificationCompleteStrings.submessage)
  }

  async checkBackArrowIsNotDisplayed() {
    try {
      this.backArrow.isDisplayed()
    } catch (e) {
      console.log("Arrow is present:", e)
    }
  }
}

export default VerificationComplete
