describe('Frontend App', () => {
  it('should be up and running', () => {
    const frontendUrl: string = Cypress.env('FRONTEND_URL');

    cy.visit(frontendUrl);
  });
});
