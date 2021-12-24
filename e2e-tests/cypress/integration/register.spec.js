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
    cy.get("@login-link").should("have.attr", "href", "/login");
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

  it("error on empty username", () => {
    cy.get("@register-btn").focus().click();

    cy.registerLoading(false);

    cy.registerError(/username is invalid/i, "username");
  });

  it("error on short username", () => {
    cy.register("123");

    cy.registerLoading(false);

    cy.registerError(/username is invalid/i, "username");
  });

  it("error on long username", () => {
    cy.register(
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
    );

    cy.registerLoading(false);

    cy.registerError(/username is invalid/i, "username");
  });

  it("error on empty email", () => {
    cy.register("demo");

    cy.registerLoading(false);

    cy.registerError(/email is invalid/i, "email");
  });

  it("error on short email", () => {
    cy.register("demo", "x@g.i");

    cy.registerLoading(false);

    cy.registerError(/email is invalid/i, "email");
  });

  it("error on invalid email", () => {
    cy.register("demo", "x@gmail.c");

    cy.registerLoading(false);

    cy.registerError(/email is invalid/i, "email");
  });

  it("error on empty password", () => {
    cy.register("demo", "demo@example.com");

    cy.registerLoading(false);

    cy.registerError(/password is invalid/i, "password");
  });

  it("error on short password", () => {
    cy.register("demo", "demo@example.com", "12345");

    cy.registerLoading(false);

    cy.registerError(/password is invalid/i, "password");
  });

  it("error on long password", () => {
    cy.register(
      "demo",
      "demo@example.com",
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
    );

    cy.registerLoading(false);

    cy.registerError(/password is invalid/i, "password");
  });

  it("error on empty name", () => {
    cy.register("demo", "demo@example.com", "demo123");

    cy.registerLoading(false);

    cy.registerError(/name is invalid/i, "name");
  });

  it("error on short name", () => {
    cy.register("demo", "demo@example.com", "demo123", "abc");

    cy.registerLoading(false);

    cy.registerError(/name is invalid/i, "name");
  });

  it("error on long name", () => {
    cy.register(
      "demo",
      "demo@example.com",
      "demo123",
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfx",
      "anonymous1"
    );

    cy.registerLoading(false);

    cy.registerError(/Full name is invalid/i, "name");
  });

  it("error on invalid name", () => {
    cy.register("demo", "demo@example.com", "demo123", "a23rd");

    cy.registerLoading(false);

    cy.registerError(/name is invalid/i, "name");
  });

  it("error on empty veil", () => {
    cy.register("demo", "demo@example.com", "demo123", "Demo User");

    cy.registerLoading(false);

    cy.registerError(/veil name is invalid/i, "veil");
  });

  it("error on short veil", () => {
    cy.register("demo", "demo@example.com", "demo123", "Demo User", "abc");

    cy.registerLoading(false);

    cy.registerError(/veil name is invalid/i, "veil");
  });

  it("error on long veil", () => {
    cy.register(
      "demo",
      "demo@example.com",
      "demo123",
      "Demo User",
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfx"
    );

    cy.registerLoading(false);

    cy.registerError(/veil name is invalid/i, "veil");
  });

  it("error on invalid veil", () => {
    cy.register("demo", "demo@example.com", "demo123", "Demo User", "1dnsa");

    cy.registerLoading(false);

    cy.registerError(/veil name is invalid/i, "veil");
  });

  it("error on non-unique username", () => {
    cy.register(
      "demo",
      "demo@example.com",
      "demo123",
      "Demo User",
      "anonymous1"
    );

    cy.registerLoading(true);

    cy.registerError(/username already exists/i, "username");
  });

  it("error on non-unique email", () => {
    cy.register(
      "demo2",
      "demo@example.com",
      "demo123",
      "Demo User",
      "anonymous1"
    );

    cy.registerLoading(true);

    cy.registerError(/email already exists/i, "email");
  });

  it("error on non-unique veil", () => {
    cy.register(
      "demo2",
      "demo2@example.com",
      "demo123",
      "Demo User",
      "anonymous1"
    );

    cy.registerLoading(true);

    cy.registerError(/veil already exists/i, "veil");
  });

  it("should redirect on successful register", () => {
    // correct register details
    cy.register(
      "demo2",
      "demo2@example.com",
      "demo123",
      "Demo User",
      "anonymous2"
    );

    // check loading status
    cy.registerLoading(true);

    // check successful status
    cy.contains(/register successful/i).should("exist");

    // wait before redirection
    cy.wait(1000);

    // check if redirected on successful login
    cy.url().should("equal", `${Cypress.config("baseUrl")}/`);

    // check if authorization is added into localsotrage
    cy.getAuthorization().should("exist");
  });
});
