/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

context("/register", () => {
  beforeEach(() => {
    cy.visit("/register");

    // wait for html hydration
    cy.wait(500);

    cy.findByRole("button", { name: /demo/i }).as("demo-btn");
    cy.findByRole("button", { name: /register/i }).as("register-btn");
    cy.get('input[name="username"]').as("username");
    cy.get('input[name="email"]').as("email");
    cy.get('input[name="password"]').as("password");
    cy.get('input[name="name"]').as("name");
    cy.get('input[name="veil"]').as("veil");
    cy.findByRole("link", { name: /already have an account/i }).as(
      "login-link"
    );
    cy.get('[aria-label="show password').as("show-password");
    cy.get('[aria-label="show veil name').as("show-veil");
  });

  it("components visibility", () => {
    cy.get("h1").findByText("veils").should("be.visible");
    cy.get("h2")
      .findByText("Share your secrets anonymously")
      .should("be.visible");
    cy.get("@demo-btn").should("be.visible");
    cy.get("@username").should("be.visible");
    cy.get("@email").should("be.visible");
    cy.get("@password").should("be.visible");
    cy.get("@name").should("be.visible");
    cy.get("@veil").should("be.visible");
    cy.get("@register-btn").should("be.visible");
    cy.get("@show-password").should("be.visible");
    cy.get("@show-veil").should("be.visible");
  });

  it("show/hide password and veil", () => {
    cy.get("@password").should("have.attr", "type", "password");
    cy.get("@veil").should("have.attr", "type", "password");

    cy.get('[aria-label="show password"').click();
    cy.get('[aria-label="show veil name"').click();

    cy.get("@password").should("have.attr", "type", "text");
    cy.get("@veil").should("have.attr", "type", "text");
  });
});
