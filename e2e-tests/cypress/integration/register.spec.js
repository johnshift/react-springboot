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

  it.skip("components visibility", () => {
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
    cy.get("@login-link").should("have.attr", "href", "/login");
    cy.get("@register-btn").should("be.visible");
    cy.get("@show-password").should("be.visible");
    cy.get("@show-veil").should("be.visible");
  });

  it.skip("show/hide password and veil", () => {
    cy.get("@password").should("have.attr", "type", "password");
    cy.get("@veil").should("have.attr", "type", "password");

    cy.get('[aria-label="show password"').click();
    cy.get('[aria-label="show veil name"').click();

    cy.get("@password").should("have.attr", "type", "text");
    cy.get("@veil").should("have.attr", "type", "text");
  });

  it.skip("error on empty username", () => {
    cy.get("@register-btn").focus().click();

    cy.registerLoading(false);

    cy.registerError(/username is invalid/i, "username");
  });

  it.skip("error on short username", () => {
    cy.register("123");

    cy.registerLoading(false);

    cy.registerError(/username is invalid/i, "username");
  });

  it.skip("error on long username", () => {
    cy.register(
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
    );

    cy.registerLoading(false);

    cy.registerError(/username is invalid/i, "username");
  });

  it.skip("error on empty email", () => {
    cy.register("demo");

    cy.registerLoading(false);

    cy.registerError(/email is invalid/i, "email");
  });

  it.skip("error on short email", () => {
    cy.register("demo", "x@g.i");

    cy.registerLoading(false);

    cy.registerError(/email is invalid/i, "email");
  });

  it.skip("error on invalid email", () => {
    cy.register("demo", "x@gmail.c");

    cy.registerLoading(false);

    cy.registerError(/email is invalid/i, "email");
  });

  it.skip("error on empty password", () => {
    cy.register("demo", "demo@example.com");

    cy.registerLoading(false);

    cy.registerError(/password is invalid/i, "password");
  });

  it.skip("error on short password", () => {
    cy.register("demo", "demo@example.com", "12345");

    cy.registerLoading(false);

    cy.registerError(/password is invalid/i, "password");
  });

  it.skip("error on long password", () => {
    cy.register(
      "demo",
      "demo@example.com",
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
    );

    cy.registerLoading(false);

    cy.registerError(/password is invalid/i, "password");
  });

  it.skip("error on empty name", () => {
    cy.register("demo", "demo@example.com", "demo123");

    cy.registerLoading(false);

    cy.registerError(/name is invalid/i, "name");
  });

  it.skip("error on short name", () => {
    cy.register("demo", "demo@example.com", "demo123", "abc");

    cy.registerLoading(false);

    cy.registerError(/name is invalid/i, "name");
  });

  it.skip("error on invalid name", () => {
    cy.register("demo", "demo@example.com", "demo123", "a23rd");

    cy.registerLoading(false);

    cy.registerError(/name is invalid/i, "name");
  });

  it.skip("error on empty veil", () => {
    cy.register("demo", "demo@example.com", "demo123", "Demo User");

    cy.registerLoading(false);

    cy.registerError(/veil name is invalid/i, "veil");
  });

  it.skip("error on short veil", () => {
    cy.register("demo", "demo@example.com", "demo123", "Demo User", "abc");

    cy.registerLoading(false);

    cy.registerError(/veil name is invalid/i, "veil");
  });

  it.skip("error on invalid veil", () => {
    cy.register("demo", "demo@example.com", "demo123", "Demo User", "1dnsa");

    cy.registerLoading(false);

    cy.registerError(/veil name is invalid/i, "veil");
  });

  it.skip("error on non-unique username", () => {
    cy.register(
      "demo",
      "demo@example.com",
      "demo123",
      "Demo User",
      "anonymous1"
    );

    cy.registerLoading(false);

    cy.registerError(/username already exists/i, "username");
  });

  it.skip("error on non-unique email", () => {
    cy.register(
      "demo",
      "demo@example.com",
      "demo123",
      "Demo User",
      "anonymous1"
    );

    cy.registerLoading(false);

    cy.registerError(/email already exists/i, "email");
  });

  it.skip("error on non-unique veil", () => {
    cy.register(
      "demo",
      "demo@example.com",
      "demo123",
      "Demo User",
      "anonymous1"
    );

    cy.registerLoading(false);

    cy.registerError(/veil name already exists/i, "veil");
  });

  it.skip("should redirect on successful register");
});
