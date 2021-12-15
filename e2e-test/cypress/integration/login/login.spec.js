/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

context('/login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

	// it('renders all components', () => {
	// 	// title
	// 	cy.get('h1')
	// 		.findByText('veils')
	// 		.should('exist');

	// 	// subtitle
	// 	cy.get('h2')
	// 		.findByText('Share your secrets anonymously')
	// 		.should('exist');

	// 	// demo button
	// 	cy.findByRole('button', { name: /demo/i })
	// 		.should('exist');

	// 	// username input
	// 	cy.findByPlaceholderText(/username or email/i)
	// 		.should('exist');

	// 	// password input
	// 	cy.findByPlaceholderText(/password/i)
	// 		.should('have.attr', 'type', 'password',);

	// 	// signup link
	// 	cy.findByRole('link', { name: /create an account/i })
	// 		.should('have.attr', 'href', '/signup');

	// 	// login button
	// 	cy.findByRole('button', { name: /login/i })
	// 		.should('have.attr', 'type', 'submit');
	// });

	// it('displays info when demo clicked', () => {

	// 	cy.findByRole('button', { name: /demo/i }).click()
	// 	cy.focused().click()

	// 	cy.findByText(/work in progress. stay tuned!/i)
	// 		.should('exist')
	// })

	it('shows error if empty', () => {

		// immediately click login
		// cy.findByRole('button', { name: /login/i})
		// 	.click()

		cy.get('form').submit()
		cy.wait(5000)

		// cy.findByRole('link', { name: /create an account/i })
		// 	.click()
	})

});
