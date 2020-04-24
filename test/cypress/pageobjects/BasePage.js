import { locale } from '../utils'


class BasePage {

  async title() { return this.$('.onfido-sdk-ui-PageTitle-titleSpan')}
  async subtitle() { return this.$('.onfido-sdk-ui-PageTitle-subTitle')}
  async backArrow() { return this.$('.onfido-sdk-ui-NavigationBar-iconBack')}

  copy(lang) { return locale(lang) }

  async clickBackArrow() {
    this.backArrow().click()
  }
}

export default BasePage
