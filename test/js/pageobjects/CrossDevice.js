import Base from './BasePage.js'

class CrossDevice extends Base{

  get crossDeviceTitle() { return this.$('.onfido-sdk-ui-Title-titleSpan')}
  get crossDeviceNumberInputLabel() { return this.$('.onfido-sdk-ui-crossDevice-CrossDeviceLink-label')}
  get crossDeviceNumberInput() { return this.$('.onfido-sdk-ui-crossDevice-CrossDeviceLink-label')}


  copy = (lang="en") =>
    require(`../../../src/locales/${lang}.json`)


}

export default CrossDevice;
