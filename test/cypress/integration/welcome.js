import { localhostUrl, supportedLanguages } from '../../config.json'
import Welcome from '../pageobjects/Welcome.js';

supportedLanguages.forEach((lang) => {

    describe(`Welcome Screen Tests in ${lang}`, function() {
        const welcome = new Welcome()
        const copy = welcome.copy(lang)

        it('should verify website title', function() {
            cy.visit(localhostUrl + `?language=${lang}`)
        })

        it('should verify website title', function() {
            cy.visit(localhostUrl) 
            cy.title().should('eq', 'Onfido SDK Demo')
        })

        it('should verify UI elements on the welcome screen', function() {
            cy.visit(localhostUrl + `?language=${lang}`)
            welcome.text().should('exist')
            welcome.primaryBtn().should('exist').should('be.visible')
            welcome.footer().should('exist').should('be.visible')

            welcome.verifyTitle(copy)
            welcome.verifySubtitle(copy)
            welcome.verifyIdentityButton(copy)
        })
    })
})