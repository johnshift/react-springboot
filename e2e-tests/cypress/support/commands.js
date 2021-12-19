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
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", (principal, password) => {
  if (principal === "" || password === "") {
    cy.get("@login-btn").focus().click();
    return;
  }

  cy.get("@principal").type(principal);

  cy.get("@password").type(password);

  cy.get("@login-btn").focus().click();
});

Cypress.Commands.add("loginLoading", (showsSkeleton) => {
  console.log("showsSkeleton: ", showsSkeleton);

  if (showsSkeleton) {
    // form should not exist
    cy.get("form").should("not.exist");

    // login skeleton exists
    cy.get("#login-skeleton").should("exist");

    // should display loading status
    cy.contains(/loading*/i).should("be.visible");
    return;
  }

  cy.get("form").should("exist");
  cy.contains("#login-skeleton").should("not.exist");
  cy.contains(/loading*/i).should("not.exist");
});

Cypress.Commands.add("loginError", (errmsg) => {
  // wait until it should display error
  cy.contains(errmsg).should("be.visible");

  // inputs should have red borders
  cy.get("@principal").should("have.class", "border-red-300");
  cy.get("@password").should("have.class", "border-red-300");
});
