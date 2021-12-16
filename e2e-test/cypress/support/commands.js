// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (principal, password) => {

	if (principal === '' || password === '') {
		cy.get('@login-btn').click();
		return;
	}

	cy.get('@principal')
		.type(principal)

	cy.get('@password')
		.type(password)

	cy.get('@login-btn')
		.click()

})

Cypress.Commands.add('loginLoading', () => {
	// form should be disabled
		cy.get('form')
			.should('have.css', 'pointer-events', 'none')
			.should('have.css', 'opacity')
		
		// button disabled
		cy.get('@login-btn')
			.should('have.attr', 'disabled')

		// input should be unclickable
		cy.get('@principal')
			.should('have.attr', 'disabled')
		cy.get('@password')
			.should('have.attr', 'disabled')

		// should display loading status
		cy.contains(/loading*/i)
			.should('be.visible')
})

Cypress.Commands.add('loginError', (errmsg) => {
		// wait until it should display error
		cy.contains(errmsg)
			.should('be.visible')

		// inputs should have red borders
		cy.get('@principal')
			.should('have.class', 'border-red-300')	
		cy.get('@password')
			.should('have.class', 'border-red-300')
})