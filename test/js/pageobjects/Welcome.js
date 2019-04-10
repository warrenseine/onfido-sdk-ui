import Base from './BasePage.js'

class WelcomeScreen extends Base{
    get primaryBtn() { return this.$('.onfido-sdk-ui-Button-button'); }
    get welcometitle() { return this.$('.onfido-sdk-ui-Title-titleSpan');  }	

}

export default WelcomeScreen;
