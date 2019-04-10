import Base from './BasePage.js'

class DocumentSelection extends Base{
    get title() { return this.$('.onfido-sdk-ui-Title-titleSpan')}
    get subtitle() { return this.$('.onfido-sdk-ui-Title-titleWrapper')}
    get passportIcon() { return this.$('.onfido-sdk-ui-DocumentSelector-icon-passport')}
    get driversLicenseIcon() { return this.$('.onfido-sdk-ui-DocumentSelector-icon-driving-licence')}
    get identityCardIcon() { return this.$('.onfido-sdk-ui-DocumentSelector-icon-national-identity-card')}
    get documentSelectionLabel() { return this.$('.onfido-sdk-ui-DocumentSelector-label')}
    get documentSelectionHint() { return this.$('.onfido-sdk-ui-DocumentSelector-hint')}

    copy = (lang="en") =>
      require(`../../../src/locales/${lang}.json`)["document_selector"]["identity"]
}

export default DocumentSelection;
