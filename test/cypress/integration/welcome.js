import { localhostUrl } from '../../config.json'

const options = {
    pageObjects: ['BasePage', 'Welcome']
  }


describe('Welcome Screen Tests', options, ({pageObjects}), function() {
    const { welcome } = pageObjects

    it('should verify website title', function() {
        cy.visit(localhostUrl)
    })

    it('should verify website title', function() {
        cy.visit(localhostUrl) 
        cy.title().should('eq', 'Onfido SDK Demo')
    })

    it('should verify UI elements on the welcome screen', function() {
        cy.visit(localhostUrl)
        cy.get(welcome.footer).should('exist')
    })
})


// describe(`WELCOME SCREEN tests`) {

//     it('should verify website title', async () => {
//       driver.get(localhostUrl + `?language=${lang}`)
//       const title = driver.getTitle()
//       expect(title).to.equal('Onfido SDK Demo')
//     })

//     it('should verify UI elements on the welcome screen', async () => {
//       driver.get(localhostUrl + `?language=${lang}`)
//       welcome.verifyTitle(copy)
//       welcome.verifySubtitle(copy)
//       welcome.verifyIdentityButton(copy)
//       welcome.verifyFooter(copy)
//     })
//   })

