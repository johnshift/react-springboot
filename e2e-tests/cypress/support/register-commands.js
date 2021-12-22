Cypress.Commands.add(
  "register",
  (username = "", email = "", password = "", name = "", veil = "") => {
    username && cy.get("@username").type(username);
    email && cy.get("@email").type(email);
    password && cy.get("@password").type(password);
    name && cy.get("@name").type(name);
    veil && cy.get("@veil").type(veil);

    cy.get("@register-btn").focus().click();
  }
);

Cypress.Commands.add("registerLoading", (showsSkeleton = false) => {
  console.log("showsSkeleton: ", showsSkeleton);

  if (showsSkeleton) {
    // form should not exist
    cy.get("form").should("not.exist");

    // register skeleton exists
    cy.get("#register-skeleton").should("exist");

    // should display loading status
    cy.contains(/loading*/i).should("be.visible");
    return;
  }

  // this confirms that register is handled by client-side validation
  // and does not require a network call to the backend api
  cy.get("form").should("exist");
  cy.contains("#register-skeleton").should("not.exist");
  cy.contains(/loading*/i).should("not.exist");
});

Cypress.Commands.add("registerError", (errmsg, fieldErr) => {
  // wait until it should display error
  cy.contains(errmsg).should("be.visible");

  // retrieve element using cypress selector
  cy.get("@" + fieldErr).should("have.class", "border-red-300");
});
