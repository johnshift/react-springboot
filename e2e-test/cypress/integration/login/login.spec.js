/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

context('/login', () => {
  beforeEach(() => {
    cy.visit('/login');

		// wait for html hydration
		cy.wait(500)

		cy.findByRole('button', { name: /demo/i }).as('demo-btn')
		cy.findByRole('button', { name: /login/i }).as('login-btn')
		cy.findByPlaceholderText(/username or email/i).as('principal')
		cy.findByPlaceholderText(/password/i).as('password')
		cy.findByRole('link', { name: /create an account/i }).as('signup-link')
  });

	it('components visibility', () => {
		// title
		cy.get('h1')
			.findByText('veils')
			.should('be.visible');

		// subtitle
		cy.get('h2')
			.findByText('Share your secrets anonymously')
			.should('be.visible');

		// demo button
		cy.get('@demo-btn')
			.should('be.visible');

		// username/email input
		cy.get('@principal')
			.should('be.visible');

		// password input
		cy.get('@password')
			.should('have.attr', 'type', 'password',);

		// signup link
		cy.get('@signup-link')
			.should('have.attr', 'href', '/signup');

		// login button
		cy.get('@login-btn')
			.should('have.attr', 'type', 'submit');
	});

	it('show info on demo', () => {

		cy.get('@demo-btn').click()
		cy.focused().click()

		cy.contains(/work in progress. stay tuned!/i)
			.should('be.visible')
	})

	it('can login using click or enter')

	it('error on empty', () => {

		// login with empty fields
		cy.login('', '');

		// check login loading status
		cy.loginLoading();

		// check login errors
		cy.loginError(/incorrect username\/email or password/i);
	})
	
	it('error on empty username/email', () => {

		// login incorrect email
		cy.login('', 'demo123')

		// check loading status
		cy.loginLoading()

		// check login errors
		cy.loginError(/incorrect username\/email or password/i);

	})

	
	it('error on empty password', () => {

		// login incorrect email
		cy.login('demo', '')

		// check loading status
		cy.loginLoading()

		// check login errors
		cy.loginError(/incorrect username\/email or password/i);

	})

	it('error on incorrect username', () => {

		// login incorrect username
		cy.login('non-existing-username', 'demo123')

		// check loading status
		cy.loginLoading()

		// check login errors
		cy.loginError(/incorrect username\/email or password/i);

	})
	
	it('error on incorrect email', () => {

		// login incorrect email
		cy.login('email@example.com', 'demo123')

		// check loading status
		cy.loginLoading()

		// check login errors
		cy.loginError(/incorrect username\/email or password/i);

	})
	
	
	it('error on incorrect password', () => {

		// login incorrect email
		cy.login('demo', 'demo1234')

		// check loading status
		cy.loginLoading()

		// check login errors
		cy.loginError(/incorrect username\/email or password/i);
	})

	it.skip('success workflow')

	it.skip('redirect if already logged in')
});
