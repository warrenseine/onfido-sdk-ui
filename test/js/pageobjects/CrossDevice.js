import Base from './BasePage.js'

class CrossDevice extends Base{

  get crossDeviceTitle() { return this.$('.onfido-sdk-ui-Title-titleSpan')}
  get crossDeviceNumberInputLabel() { return this.$('div#onfido-mount div.onfido-sdk-ui-crossDevice-CrossDeviceLink-smsSection > div.onfido-sdk-ui-crossDevice-CrossDeviceLink-label')}
  get crossDeviceNumberInput() { return this.$('.onfido-sdk-ui-crossDevice-CrossDeviceLink-label')}
  get crossDeviceSendLinkBtn() { return this.$('div#onfido-mount div.onfido-sdk-ui-crossDevice-CrossDeviceLink-numberInputSection > button')}
  get crossDeviceCopyLinkInstead() { return this.$('div#onfido-mount div.onfido-sdk-ui-crossDevice-CrossDeviceLink-copyLinkSection > div.onfido-sdk-ui-crossDevice-CrossDeviceLink-label')}
  get crossDeviceCopyToClipboardBtn() { return this.$('.onfido-sdk-ui-crossDevice-CrossDeviceLink-copyToClipboard')}
  get crossDeviceCopyLinkContainer() { return this.$('.onfido-sdk-ui-crossDevice-CrossDeviceLink-linkContainer')}
  get crossDeviceDivider() { return this.$('.onfido-sdk-ui-crossDevice-CrossDeviceLink-divider')}

  copy = (lang="en") =>
    require(`../../../src/locales/${lang}.json`)


}

export default CrossDevice;
