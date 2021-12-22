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
