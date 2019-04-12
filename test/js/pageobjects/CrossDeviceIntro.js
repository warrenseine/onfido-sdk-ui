import Base from './BasePage.js'

class CrossDeviceIntro extends Base{

  get crossDeviceIntroTitle() { return this.$('.onfido-sdk-ui-Title-titleSpan')}
  get smsIcon() { return this.$('div#onfido-mount div.onfido-sdk-ui-crossDevice-Intro-stageIcon.onfido-sdk-ui-crossDevice-Intro-stageIcon-sms')}
  get takePhotosIcon() { return this.$('div#onfido-mount div.onfido-sdk-ui-crossDevice-Intro-stageIcon.onfido-sdk-ui-crossDevice-Intro-stageIcon-take-photos')}
  get returnToComputerIcon() { return this.$('div#onfido-mount div.onfido-sdk-ui-crossDevice-Intro-stageIcon.onfido-sdk-ui-crossDevice-Intro-stageIcon-return-computer')}
  get smsMessage() { return this.$('div#onfido-mount div:nth-child(1) > div.onfido-sdk-ui-crossDevice-Intro-stageMessage')}
  get takePhotosMessage() { return this.$('div#onfido-mount div:nth-child(2) > div.onfido-sdk-ui-crossDevice-Intro-stageMessage')}
  get returnToComputerMessage() { return this.$('div#onfido-mount div:nth-child(3) > div.onfido-sdk-ui-crossDevice-Intro-stageMessage')}
  get letsStartButton() { return this.$('div#onfido-mount div:nth-child(3) > button')}

    copy = (lang="en") =>
      require(`../../../src/locales/${lang}.json`)
}

export default CrossDeviceIntro;
