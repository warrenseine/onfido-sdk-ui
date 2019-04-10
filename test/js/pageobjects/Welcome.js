import Base from './BasePage.js'

class WelcomeScreen extends Base{
    get welcomeTitle() { return this.$('.onfido-sdk-ui-Title-titleSpan')}
    get welcomeSubtitle() { return this.$('.onfido-sdk-ui-Welcome-text')}
    get primaryBtn() { return this.$('.onfido-sdk-ui-Button-button')}
    get footer() { return this.$('.onfido-sdk-ui-Theme-footer')}
}

export default WelcomeScreen;
