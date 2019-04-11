import Base from './BasePage.js'

class DocumentSelection extends Base{
    get title() { return this.$('.onfido-sdk-ui-Title-titleSpan')}
    get subtitle() { return this.$('.onfido-sdk-ui-Title-titleWrapper')}
    get passportIcon() { return this.$('.onfido-sdk-ui-DocumentSelector-icon-passport')}
    get documentSelectionLabel() { return this.$('.onfido-sdk-ui-DocumentSelector-label')}
    get documentSelectionHint() { return this.$('.onfido-sdk-ui-DocumentSelector-hint')}
    get drivingLicenceIcon() { return this.$('.onfido-sdk-ui-DocumentSelector-icon-driving-licence')}
    get drivingLicenceLabel() { return this.$('div#onfido-mount div:nth-child(2) > div.onfido-sdk-ui-DocumentSelector-content > div > p')}
    get drivingLicenceHint() { return this.$('div#onfido-mount div:nth-child(2) > div.onfido-sdk-ui-DocumentSelector-content > div > div')}
    get identityCardIcon() { return this.$('.onfido-sdk-ui-DocumentSelector-icon-national-identity-card')}
    get identityCardLabel() { return this.$('div#onfido-mount div:nth-child(3) > div.onfido-sdk-ui-DocumentSelector-content > div > p')}
    get identityCardHint() { return this.$('div#onfido-mount div:nth-child(3) > div.onfido-sdk-ui-DocumentSelector-content > div > div')}

    copy = (lang="en") =>
      require(`../../../src/locales/${lang}.json`)["document_selector"]["identity"]
}

export default DocumentSelection;
